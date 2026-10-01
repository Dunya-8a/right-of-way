// In-browser port of the physics referee (row/physics/propagation.py +
// screening.py): exact two-body propagation via universal variables, and
// sample-and-refine conjunction screening. Same algorithm, same constants, so
// a burn the browser approves is a burn the Python referee would approve.
//
// Units match row/contracts.py: km, km/s, seconds since the scenario epoch.

export type Vec3 = [number, number, number];
export interface StateRV { r: Vec3; v: Vec3; }

export const MU_EARTH = 398_600.4418;

const NEWTON_TOL = 1e-10;
const NEWTON_MAX_ITER = 100;
const STUMPFF_SERIES_CUTOFF = 1e-3;

const add = (a: Vec3, b: Vec3): Vec3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const sub = (a: Vec3, b: Vec3): Vec3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const scale = (a: Vec3, k: number): Vec3 => [a[0] * k, a[1] * k, a[2] * k];
const dot = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a: Vec3, b: Vec3): Vec3 => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
export const norm = (a: Vec3) => Math.hypot(a[0], a[1], a[2]);
const unit = (a: Vec3): Vec3 => scale(a, 1 / norm(a));
export const vec = { add, sub, scale, dot, cross, norm, unit };

function stumpffC(z: number): number {
  if (z > STUMPFF_SERIES_CUTOFF) return (1 - Math.cos(Math.sqrt(z))) / z;
  if (z < -STUMPFF_SERIES_CUTOFF) return (Math.cosh(Math.sqrt(-z)) - 1) / -z;
  return 0.5 - z / 24 + (z * z) / 720 - (z * z * z) / 40320;
}

function stumpffS(z: number): number {
  if (z > STUMPFF_SERIES_CUTOFF) {
    const sz = Math.sqrt(z);
    return (sz - Math.sin(sz)) / (sz * sz * sz);
  }
  if (z < -STUMPFF_SERIES_CUTOFF) {
    const sz = Math.sqrt(-z);
    return (Math.sinh(sz) - sz) / (sz * sz * sz);
  }
  return 1 / 6 - z / 120 + (z * z) / 5040 - (z * z * z) / 362880;
}

/** Advance a Cartesian state `dt` seconds under two-body gravity (dt may be < 0). */
export function propagate(s: StateRV, dt: number, mu = MU_EARTH): StateRV {
  const { r: r0, v: v0 } = s;
  if (dt === 0) return { r: [...r0], v: [...v0] };
  const sqrtMu = Math.sqrt(mu);
  const r0m = norm(r0);
  const v0m = norm(v0);
  const vr0 = dot(r0, v0) / r0m;
  const alpha = 2 / r0m - (v0m * v0m) / mu;

  let chi = sqrtMu * Math.abs(alpha) * dt;
  for (let i = 0; i < NEWTON_MAX_ITER; i++) {
    const z = alpha * chi * chi;
    const c = stumpffC(z), sS = stumpffS(z);
    const chi2 = chi * chi, chi3 = chi2 * chi;
    const f = (r0m * vr0 / sqrtMu) * chi2 * c + (1 - alpha * r0m) * chi3 * sS + r0m * chi - sqrtMu * dt;
    const df = (r0m * vr0 / sqrtMu) * chi * (1 - alpha * chi2 * sS) + (1 - alpha * r0m) * chi2 * c + r0m;
    const dchi = f / df;
    chi -= dchi;
    if (Math.abs(dchi) < NEWTON_TOL) break;
  }

  const z = alpha * chi * chi;
  const c = stumpffC(z), sS = stumpffS(z);
  const chi2 = chi * chi, chi3 = chi2 * chi;
  const fL = 1 - (chi2 / r0m) * c;
  const gL = dt - (chi3 / sqrtMu) * sS;
  const r = add(scale(r0, fL), scale(v0, gL));
  const rm = norm(r);
  const fdot = (sqrtMu / (rm * r0m)) * (alpha * chi3 * sS - chi);
  const gdot = 1 - (chi2 / rm) * c;
  return { r, v: add(scale(r0, fdot), scale(v0, gdot)) };
}

/** Orbital frame at a state: radial (away from Earth), along-track, cross-track. */
export function rtnBasis(s: StateRV): { R: Vec3; T: Vec3; N: Vec3 } {
  const R = unit(s.r);
  const N = unit(cross(s.r, s.v));
  const T = cross(N, R);
  return { R, T, N };
}

export interface Burn { t: number; dv: Vec3; }

/** One object's piecewise trajectory: an epoch state plus impulsive burns. */
export class Trajectory {
  private anchors: { t: number; s: StateRV }[];

  constructor(epochState: StateRV, burns: Burn[] = []) {
    this.anchors = [{ t: 0, s: epochState }];
    for (const b of [...burns].sort((x, y) => x.t - y.t)) {
      const last = this.anchors[this.anchors.length - 1];
      const at = propagate(last.s, b.t - last.t);
      this.anchors.push({ t: b.t, s: { r: at.r, v: add(at.v, b.dv) } });
    }
  }

  stateAt(t: number): StateRV {
    let a = this.anchors[0];
    for (const x of this.anchors) {
      if (x.t <= t + 1e-9) a = x;
      else break;
    }
    return propagate(a.s, t - a.t);
  }
}

export interface Approach { tca: number; miss: number; relSpeed: number; }

const INV_PHI = (Math.sqrt(5) - 1) / 2;

function goldenMin(f: (t: number) => number, lo: number, hi: number): [number, number] {
  let a = lo, b = hi;
  let c = b - INV_PHI * (b - a), d = a + INV_PHI * (b - a);
  let fc = f(c), fd = f(d);
  for (let i = 0; i < 200 && b - a >= 1e-3; i++) {
    if (fc < fd) { b = d; d = c; fd = fc; c = b - INV_PHI * (b - a); fc = f(c); }
    else { a = c; c = d; fc = fd; d = a + INV_PHI * (b - a); fd = f(d); }
  }
  const t = 0.5 * (a + b);
  return [t, f(t)];
}

/**
 * Deepest close approach between two trajectories over [t0, t1] — the same
 * coarse-sample + golden-section refine the Python screener runs.
 */
export function closestApproach(a: Trajectory, b: Trajectory, t0: number, t1: number, step = 5): Approach {
  const sep = (t: number) => norm(sub(a.stateAt(t).r, b.stateAt(t).r));
  const times: number[] = [];
  for (let t = t0; t < t1; t += step) times.push(t);
  times.push(t1);
  const d = times.map(sep);
  let best: Approach = { tca: t0, miss: Infinity, relSpeed: 0 };
  for (let k = 0; k < d.length; k++) {
    const leftOk = k === 0 || d[k] <= d[k - 1];
    const rightOk = k === d.length - 1 || d[k] <= d[k + 1];
    if (!leftOk || !rightOk) continue;
    const lo = times[Math.max(0, k - 1)], hi = times[Math.min(d.length - 1, k + 1)];
    const [t, m] = hi > lo ? goldenMin(sep, lo, hi) : [times[k], d[k]];
    if (m < best.miss) best = { tca: t, miss: m, relSpeed: 0 };
  }
  const sa = a.stateAt(best.tca), sb = b.stateAt(best.tca);
  best.relSpeed = norm(sub(sa.v, sb.v));
  return best;
}

/**
 * The miss geometry at closest approach, in the plane perpendicular to the
 * relative velocity (the "B-plane" conjunction analysts use). x is the local
 * vertical (up = away from Earth), y completes the frame. km.
 */
export function missOffset(a: Trajectory, b: Trajectory, tca: number): [number, number] {
  const sa = a.stateAt(tca), sb = b.stateAt(tca);
  const dr = sub(sa.r, sb.r);
  const dv = sub(sa.v, sb.v);
  const w = unit(dv);
  // project local vertical into the plane ⟂ relative velocity
  let up = unit(add(sa.r, sb.r));
  up = sub(up, scale(w, dot(up, w)));
  if (norm(up) < 1e-9) up = rtnBasis(sa).N;
  up = unit(up);
  const side = cross(w, up);
  return [dot(dr, side), dot(dr, up)];
}
