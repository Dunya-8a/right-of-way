// A Close Call puzzle: one real (or reconstructed) encounter, the referee that
// judges a player's burn, and the solver that finds the cheapest possible dodge
// so a score means something. Built on orbit.ts, the port of the Python core.

import {
  Trajectory, closestApproach, rtnBasis, norm, vec,
  type Approach, type StateRV, type Vec3,
} from './orbit.js';

export interface TimelineJSON {
  meta: Record<string, unknown>;
  frames: { t: number; objects: { id: string; r: Vec3; v?: Vec3 | null }[] }[];
  events: { t: number; type: string; data: Record<string, unknown> }[];
}

export interface ObjectCopy { name: string; label: string; operational?: boolean; norad?: number | null; }
export interface PuzzleMeta {
  number?: number;
  date?: string | null;
  kind: 'daily' | 'classic' | 'practice';
  title: string;
  headline?: string;
  context?: string;
  agents_brain?: string;
  source?: { name: string; url: string; tca_utc?: string; predicted_miss_m?: number; max_probability?: number };
  objects: Record<string, ObjectCopy>;
}

interface ObjInfo { type: string; priority: number; fuel_budget_dv: number; }

export type Verdict = 'none' | 'fuel' | 'close' | 'new' | 'safe';

export interface Shot { mover: string; tBurn: number; along: number; radial: number; } // m/s

export interface Judgement {
  shot: Shot;
  dvMs: number;
  verdict: Verdict;
  pair: Approach;                 // the encounter after the burn (or unchanged)
  offset: [number, number];       // where they pass, km, in the fixed miss plane
  newRisk?: { id: string; ap: Approach };
  traj: Trajectory;               // the mover's trajectory with the burn
}

export interface CurvePoint { lead: number; dvMs: number; shot: Shot; }

const FUEL_TOL_MS = 1e-6;
export const MAX_PUSH_MS = 30;

export class Puzzle {
  readonly meta: PuzzleMeta;
  readonly threshold: number;
  readonly window: number;
  readonly pair: [string, string];
  readonly original: Approach;
  readonly baseline = new Map<string, Trajectory>();
  readonly info: Record<string, ObjInfo>;
  private epoch = new Map<string, StateRV>();
  private basis: { side: Vec3; up: Vec3 };
  readonly originalOffset: [number, number];

  constructor(readonly tl: TimelineJSON, readonly id: string) {
    this.meta = (tl.meta['puzzle'] as PuzzleMeta) ?? { kind: 'practice', title: id, objects: {} };
    this.threshold = (tl.meta['conjunction_threshold_km'] as number) ?? 5;
    this.window = (tl.meta['screen_window_s'] as number) ?? 3600;
    this.info = (tl.meta['object_info'] as Record<string, ObjInfo>) ?? {};
    for (const o of tl.frames[0].objects) {
      const s = { r: o.r, v: o.v as Vec3 };
      this.epoch.set(o.id, s);
      this.baseline.set(o.id, new Trajectory(s));
    }
    const first = tl.events.find(e => e.type === 'conjunction_detected')!;
    this.pair = [first.data['a_id'] as string, first.data['b_id'] as string];
    const [a, b] = this.pair;
    this.original = closestApproach(this.baseline.get(a)!, this.baseline.get(b)!, 0, this.window);

    // A fixed "miss plane" (perpendicular to the relative velocity at closest
    // approach) so every burn's pass point lands on the same picture.
    const sa = this.baseline.get(a)!.stateAt(this.original.tca);
    const sb = this.baseline.get(b)!.stateAt(this.original.tca);
    const w = vec.unit(vec.sub(sa.v, sb.v));
    let up = vec.unit(vec.add(sa.r, sb.r));
    up = vec.unit(vec.sub(up, vec.scale(w, vec.dot(up, w))));
    this.basis = { up, side: vec.cross(w, up) };
    this.originalOffset = this.offsetAt(this.baseline.get(a)!, this.baseline.get(b)!, this.original.tca);
  }

  label(id: string) { return this.meta.objects[id]?.name ?? id; }
  fuelMs(id: string) { return (this.info[id]?.fuel_budget_dv ?? 0) * 1000; }
  canSteer(id: string) { return this.fuelMs(id) >= 1; }
  partnerOf(id: string) { return this.pair[0] === id ? this.pair[1] : this.pair[0]; }
  maxPush(id: string) { return Math.min(MAX_PUSH_MS, this.fuelMs(id)); }

  /** Who steers by default: the norm says the lower-priority capable one yields. */
  defaultMover(): string {
    const capable = this.pair.filter(id => this.canSteer(id));
    if (!capable.length) return this.pair[0];
    return capable.sort((x, y) => (this.info[x]?.priority ?? 0) - (this.info[y]?.priority ?? 0))[0];
  }

  /** The AI agents' committed burns, in order. */
  agentBurns() {
    return this.tl.events
      .filter(e => e.type === 'maneuver_committed')
      .map(e => ({
        id: e.data['obj_id'] as string,
        t: e.data['t_burn'] as number,
        dv: e.data['dv_vector'] as Vec3,
        dvMs: (e.data['est_dv_cost'] as number) * 1000,
      }));
  }
  agentsTotalMs() { return this.agentBurns().reduce((s, b) => s + b.dvMs, 0); }

  /** Every object's trajectory as the AI agents actually flew it. */
  agentTrajectories(): Map<string, Trajectory> {
    const out = new Map<string, Trajectory>();
    const burns = this.agentBurns();
    for (const [id, s] of this.epoch) {
      out.set(id, new Trajectory(s, burns.filter(b => b.id === id).map(b => ({ t: b.t, dv: b.dv }))));
    }
    return out;
  }

  dvVector(shot: Shot): Vec3 {
    const { R, T } = rtnBasis(this.baseline.get(shot.mover)!.stateAt(shot.tBurn));
    return vec.scale(vec.add(vec.scale(T, shot.along), vec.scale(R, shot.radial)), 1 / 1000);
  }

  offsetAt(a: Trajectory, b: Trajectory, t: number): [number, number] {
    const dr = vec.sub(a.stateAt(t).r, b.stateAt(t).r);
    return [vec.dot(dr, this.basis.side), vec.dot(dr, this.basis.up)];
  }

  /** The referee: fuel, the original encounter, and everything else in the sky. */
  judge(shot: Shot, opts: { narrow?: boolean; skipOthers?: boolean } = {}): Judgement {
    const dv = this.dvVector(shot);
    const dvMs = norm(dv) * 1000;
    const partner = this.partnerOf(shot.mover);
    const traj = new Trajectory(this.epoch.get(shot.mover)!, dvMs > 0 ? [{ t: shot.tBurn, dv }] : []);
    const pTraj = this.baseline.get(partner)!;
    const [a, b] = shot.mover === this.pair[0] ? [traj, pTraj] : [pTraj, traj];
    const base: Omit<Judgement, 'verdict' | 'pair' | 'offset'> = { shot, dvMs, traj };
    if (dvMs === 0) return { ...base, verdict: 'none', pair: this.original, offset: this.originalOffset };
    if (dvMs > this.fuelMs(shot.mover) + FUEL_TOL_MS) {
      return { ...base, verdict: 'fuel', pair: this.original, offset: this.originalOffset };
    }
    const t0 = opts.narrow ? Math.max(shot.tBurn, this.original.tca - 200) : shot.tBurn;
    const t1 = opts.narrow ? Math.min(this.window, this.original.tca + 200) : this.window;
    const pair = closestApproach(traj, pTraj, t0, t1);
    const offset = this.offsetAt(a, b, pair.tca);
    if (pair.miss <= this.threshold) return { ...base, verdict: 'close', pair, offset };
    if (!opts.skipOthers) {
      let newRisk: Judgement['newRisk'];
      for (const [id, tr] of this.baseline) {
        if (id === shot.mover || id === partner) continue;
        const ap = closestApproach(traj, tr, shot.tBurn, this.window);
        if (ap.miss <= this.threshold && (!newRisk || ap.miss < newRisk.ap.miss)) newRisk = { id, ap };
      }
      if (newRisk) return { ...base, verdict: 'new', pair, offset, newRisk };
    }
    return { ...base, verdict: 'safe', pair, offset };
  }

  /**
   * Cheapest safe burn at one firing time. The miss point moves almost
   * linearly with a small burn, so a 2×2 sensitivity matrix predicts the
   * minimum push in every direction; the exact referee then confirms and
   * trims the best few candidates.
   */
  cheapestAt(mover: string, tBurn: number): CurvePoint | null {
    const maxPush = this.maxPush(mover);
    const shot = (along: number, radial: number): Shot => ({ mover, tBurn, along, radial });
    const m0 = this.judge(shot(0, 0), { narrow: true }).offset;
    const probe = (al: number, ra: number) => this.judge(shot(al, ra), { narrow: true, skipOthers: true }).offset;
    const mT = probe(1, 0), mR = probe(0, 1);
    const dT = [mT[0] - m0[0], mT[1] - m0[1]], dR = [mR[0] - m0[0], mR[1] - m0[1]];
    const target = this.threshold * 1.01;

    const cands: { th: number; s: number }[] = [];
    for (let deg = 0; deg < 360; deg += 3) {
      const th = (deg * Math.PI) / 180, c = Math.cos(th), s = Math.sin(th);
      const d = [dT[0] * c + dR[0] * s, dT[1] * c + dR[1] * s];
      const A = d[0] * d[0] + d[1] * d[1];
      const B = 2 * (m0[0] * d[0] + m0[1] * d[1]);
      const C = m0[0] * m0[0] + m0[1] * m0[1] - target * target;
      const disc = B * B - 4 * A * C;
      if (A < 1e-12 || disc < 0) continue;
      const root = (-B + Math.sqrt(disc)) / (2 * A);
      if (root > 0) cands.push({ th, s: root });
    }
    cands.sort((x, y) => x.s - y.s);

    // Directions whose dodge runs into a third object are ruled out together
    // with their neighbours, so the search moves on to genuinely different ones.
    const blocked: number[] = [];
    const angDist = (x: number, y: number) => Math.abs(Math.atan2(Math.sin(x - y), Math.cos(x - y)));
    let tries = 0;
    for (const { th, s } of cands) {
      if (s > maxPush * 1.3 || tries >= 10) break;
      if (blocked.some(b => angDist(b, th) < 0.25)) continue;
      tries++;
      const at = (m: number) => shot(Math.cos(th) * m, Math.sin(th) * m);
      // grow until the exact referee agrees (the linear model is a guess)
      let hi = Math.min(s * 1.05, maxPush);
      let ok = this.judge(at(hi), { narrow: true, skipOthers: true }).verdict === 'safe';
      for (let k = 0; !ok && k < 4 && hi < maxPush; k++) {
        hi = Math.min(hi * 1.15, maxPush);
        ok = this.judge(at(hi), { narrow: true, skipOthers: true }).verdict === 'safe';
      }
      if (!ok) continue;
      if (this.judge(at(hi)).verdict === 'new') { blocked.push(th); continue; }
      let lo = hi * 0.7;
      for (let k = 0; k < 10; k++) {
        const mid = (lo + hi) / 2;
        if (this.judge(at(mid), { narrow: true, skipOthers: true }).verdict === 'safe') hi = mid; else lo = mid;
      }
      const m = Math.ceil(hi * 10) / 10; // the controls step in 0.1 m/s
      const final = at(m);
      const v = this.judge(final).verdict;
      if (v === 'safe') return { lead: this.original.tca - tBurn, dvMs: m, shot: final };
      if (v === 'new') blocked.push(th);
    }
    return null;
  }

  /** Fuel needed vs. how long before the encounter you fire. */
  costCurve(mover: string, step = 15): CurvePoint[] {
    const out: CurvePoint[] = [];
    for (let tb = 0; tb <= this.original.tca - 15; tb += step) {
      const p = this.cheapestAt(mover, tb);
      if (p) out.push(p);
    }
    return out;
  }
}

export function stars(youMs: number, bestMs: number): number {
  const r = youMs / Math.max(bestMs, 1e-6);
  return r <= 1.15 ? 3 : r <= 1.75 ? 2 : 1;
}
