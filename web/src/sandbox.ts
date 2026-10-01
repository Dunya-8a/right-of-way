// "Your move" — the visitor takes the operator's seat. Pick who burns, when,
// and which way; the in-browser physics referee (orbit.ts, a port of the
// Python core) judges it live with the same rules the agents faced: the burn
// must fit the fuel tank, clear the original encounter, and not create a new
// near-miss with anything else in the sky.

import {
  Trajectory, closestApproach, missOffset, rtnBasis, norm, vec,
  type Approach, type Burn, type StateRV, type Vec3,
} from './orbit.js';

export interface TimelineLike {
  meta: Record<string, unknown>;
  frames: { t: number; objects: { id: string; r: Vec3; v?: Vec3 | null }[] }[];
  events: { t: number; type: string; data: Record<string, unknown> }[];
}

interface ObjInfo { type: string; priority: number; fuel_budget_dv: number; }

export type Verdict = 'none' | 'fuel' | 'collide' | 'new' | 'clear';

export interface SandboxResult {
  mover: string;
  partner: string;
  burn: Burn;
  dvMs: number;
  verdict: Verdict;
  trajs: Map<string, Trajectory>;   // every object; the mover carries the burn
  baseline: Map<string, Trajectory>; // nobody burns
  original: Approach;               // the encounter as predicted with no burn
  pair: Approach;                   // the encounter after your burn
  newRisk?: { id: string; ap: Approach };
}

export interface SandboxHost {
  onResult(r: SandboxResult): void;
  onFly(): void;
  onExit(): void;
}

const FUEL_TOL = 1e-9; // km/s, same as the Python referee

const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;

function fmtClock(s: number): string {
  const m = Math.floor(Math.abs(s) / 60), ss = Math.floor(Math.abs(s) % 60);
  return `${m}:${String(ss).padStart(2, '0')}`;
}

export class Sandbox {
  private tl: TimelineLike | null = null;
  private scenarioKey = '';
  private info: Record<string, ObjInfo> = {};
  private epoch = new Map<string, StateRV>();
  private baseline = new Map<string, Trajectory>();
  private pairIds: [string, string] = ['', ''];
  private original!: Approach;
  private threshold = 5;
  private window = 3600;
  private mover = '';
  private last: SandboxResult | null = null;
  private pending = false;
  private agentsDvMs = 0;
  private agentsBurns = 0;
  private agentsFirstBurnT = 0;

  private el = {
    panel: $('sandbox-panel'),
    brief: $('sb-brief'),
    movers: $('sb-movers'),
    when: $<HTMLInputElement>('sb-when'),
    whenVal: $('sb-when-val'),
    at: $<HTMLInputElement>('sb-at'),
    rad: $<HTMLInputElement>('sb-rad'),
    crs: $<HTMLInputElement>('sb-crs'),
    atVal: $('sb-at-val'),
    radVal: $('sb-rad-val'),
    crsVal: $('sb-crs-val'),
    dvTotal: $('sb-dv-total'),
    fuelBar: $('sb-fuel-bar'),
    fuelText: $('sb-fuel-text'),
    bull: $<HTMLCanvasElement>('sb-bullseye'),
    verdict: $('sb-verdict'),
    verdictSub: $('sb-verdict-sub'),
    score: $('sb-score'),
    tip: $('sb-tip'),
  };

  constructor(private host: SandboxHost) {
    for (const r of [this.el.when, this.el.at, this.el.rad, this.el.crs]) {
      r.addEventListener('input', () => this.schedule());
    }
    $('sb-close').addEventListener('click', () => this.host.onExit());
    $('sb-reset').addEventListener('click', () => { this.setSliders(0, 0, 0); this.schedule(); });
    $('sb-agents').addEventListener('click', () => this.loadAgentsBurn());
    $('sb-fly').addEventListener('click', () => this.host.onFly());
    $('sb-share').addEventListener('click', () => this.share());
    new ResizeObserver(() => this.drawBullseye()).observe(this.el.bull);
  }

  get active() { return document.body.classList.contains('sandbox'); }
  get result() { return this.last; }

  /** Enter the sandbox on a timeline's opening encounter. Returns false if it can't. */
  open(tl: TimelineLike, scenarioKey: string, preset?: string | null): boolean {
    const first = tl.events.find(e => e.type === 'conjunction_detected');
    const f0 = tl.frames[0];
    if (!first || !f0 || f0.objects.some(o => !o.v)) return false;

    this.tl = tl;
    this.scenarioKey = scenarioKey;
    this.threshold = (tl.meta['conjunction_threshold_km'] as number) ?? 5;
    this.window = (tl.meta['screen_window_s'] as number) ?? 3600;
    this.info = (tl.meta['object_info'] as Record<string, ObjInfo>) ?? {};
    this.epoch.clear();
    this.baseline.clear();
    for (const o of f0.objects) {
      const s = { r: o.r, v: o.v as Vec3 };
      this.epoch.set(o.id, s);
      this.baseline.set(o.id, new Trajectory(s));
    }
    this.pairIds = [first.data['a_id'] as string, first.data['b_id'] as string];
    const [a, b] = this.pairIds;
    this.original = closestApproach(this.baseline.get(a)!, this.baseline.get(b)!, 0, this.window);

    const agentBurns = tl.events.filter(e => e.type === 'maneuver_committed');
    this.agentsBurns = agentBurns.length;
    this.agentsFirstBurnT = (agentBurns[0]?.data['t_burn'] as number) ?? 0;
    this.agentsDvMs = agentBurns.reduce((s, e) => s + (e.data['est_dv_cost'] as number) * 1000, 0);

    this.el.brief.innerHTML = '';
    const lead = document.createElement('p');
    lead.innerHTML =
      `<b>${a}</b> and <b>${b}</b> will pass <span class="sb-red">${this.original.miss.toFixed(2)} km</span> ` +
      `apart in ${fmtClock(this.original.tca)} — closing at ${this.original.relSpeed.toFixed(1)} km/s. ` +
      `Design the dodge. The physics referee decides if it counts.`;
    this.el.brief.appendChild(lead);

    // burn time: from now until 10 s before closest approach
    this.el.when.min = '0';
    this.el.when.max = String(Math.max(10, Math.floor(this.original.tca - 10)));
    this.el.when.step = '5';

    this.buildMoverButtons();
    // default: the one who can actually move, burning 3 minutes out
    const capable = this.pairIds.find(id => (this.info[id]?.fuel_budget_dv ?? 0) > 0.001) ?? a;
    this.selectMover(capable);
    this.el.when.value = String(Math.max(0, Math.round((this.original.tca - 180) / 5) * 5));
    this.setSliders(0, 0, 0);

    if (preset) this.applyPreset(preset);
    document.body.classList.add('sandbox');
    this.compute();
    this.updateScoreLine();
    return true;
  }

  close() {
    document.body.classList.remove('sandbox');
  }

  // ── controls ──────────────────────────────────────────────────────────────
  private buildMoverButtons() {
    this.el.movers.innerHTML = '';
    for (const id of this.pairIds) {
      const inf = this.info[id];
      const fuelMs = (inf?.fuel_budget_dv ?? 0) * 1000;
      const btn = document.createElement('button');
      btn.className = 'sb-mover';
      btn.dataset['id'] = id;
      const empty = fuelMs < 1;
      btn.innerHTML =
        `<span class="sb-mover-name">${id}</span>` +
        `<span class="sb-mover-meta">priority ${inf?.priority ?? '?'} · ` +
        `${empty ? '<span class="sb-red">tank empty</span>' : `${fuelMs.toFixed(0)} m/s fuel`}</span>`;
      btn.addEventListener('click', () => { this.selectMover(id); this.schedule(); });
      this.el.movers.appendChild(btn);
    }
  }

  private selectMover(id: string) {
    this.mover = id;
    this.el.movers.querySelectorAll<HTMLElement>('.sb-mover').forEach(b =>
      b.classList.toggle('on', b.dataset['id'] === id));
  }

  private setSliders(at: number, rad: number, crs: number) {
    this.el.at.value = String(at);
    this.el.rad.value = String(rad);
    this.el.crs.value = String(crs);
  }

  private loadAgentsBurn() {
    if (!this.tl) return;
    const ev = this.tl.events.find(e =>
      e.type === 'maneuver_committed' && this.pairIds.includes(e.data['obj_id'] as string));
    if (!ev) return;
    const id = ev.data['obj_id'] as string;
    const tb = ev.data['t_burn'] as number;
    const dv = ev.data['dv_vector'] as Vec3;
    const { R, T, N } = rtnBasis(this.baseline.get(id)!.stateAt(tb));
    this.selectMover(id);
    this.el.when.value = String(Math.round(tb / 5) * 5);
    const ms = (v: number) => Math.round(v * 1000 * 10) / 10; // slider step 0.1
    this.setSliders(ms(vec.dot(dv, T)), ms(vec.dot(dv, R)), ms(vec.dot(dv, N)));
    this.schedule();
  }

  private applyPreset(p: string) {
    const [id, tb, at, rad, crs] = p.split(',');
    if (!this.pairIds.includes(id)) return;
    this.selectMover(id);
    this.el.when.value = String(Number(tb) || 0);
    this.setSliders(Number(at) || 0, Number(rad) || 0, Number(crs) || 0);
  }

  private presetString(): string {
    return [this.mover, this.el.when.value, this.el.at.value, this.el.rad.value, this.el.crs.value].join(',');
  }

  private async share() {
    const url = new URL(location.href);
    url.searchParams.set('timeline', this.scenarioKey);
    url.searchParams.set('try', this.presetString());
    url.searchParams.delete('autoplay');
    const btn = $('sb-share');
    try {
      await navigator.clipboard.writeText(url.toString());
      btn.textContent = '✓ LINK COPIED';
    } catch {
      history.replaceState(null, '', url);
      btn.textContent = '✓ LINK IN ADDRESS BAR';
    }
    setTimeout(() => { btn.textContent = '⧉ SHARE'; }, 1800);
  }

  private schedule() {
    if (this.pending) return;
    this.pending = true;
    requestAnimationFrame(() => { this.pending = false; this.compute(); });
  }

  // ── the referee ───────────────────────────────────────────────────────────
  private compute() {
    if (!this.tl) return;
    const tBurn = Number(this.el.when.value);
    const at = Number(this.el.at.value), rad = Number(this.el.rad.value), crs = Number(this.el.crs.value);
    const toTca = this.original.tca - tBurn;
    this.el.whenVal.textContent = `${fmtClock(toTca)} before closest approach`;
    const sign = (v: number) => (v > 0 ? '+' : v < 0 ? '−' : '');
    this.el.atVal.textContent = `${sign(at)}${Math.abs(at).toFixed(1)}`;
    this.el.radVal.textContent = `${sign(rad)}${Math.abs(rad).toFixed(1)}`;
    this.el.crsVal.textContent = `${sign(crs)}${Math.abs(crs).toFixed(1)}`;

    const mover = this.mover;
    const partner = this.pairIds[0] === mover ? this.pairIds[1] : this.pairIds[0];
    const { R, T, N } = rtnBasis(this.baseline.get(mover)!.stateAt(tBurn));
    const dv: Vec3 = vec.scale(vec.add(vec.add(vec.scale(T, at), vec.scale(R, rad)), vec.scale(N, crs)), 1 / 1000);
    const dvMs = norm(dv) * 1000;
    const fuelMs = (this.info[mover]?.fuel_budget_dv ?? Infinity) * 1000;

    const burn: Burn = { t: tBurn, dv };
    const trajs = new Map(this.baseline);
    const moverTraj = new Trajectory(this.epoch.get(mover)!, dvMs > 0 ? [burn] : []);
    trajs.set(mover, moverTraj);

    let verdict: Verdict;
    let pair = this.original;
    let newRisk: SandboxResult['newRisk'];
    if (dvMs === 0) {
      verdict = 'none';
    } else if (dvMs / 1000 > fuelMs / 1000 + FUEL_TOL) {
      verdict = 'fuel';
    } else {
      pair = closestApproach(moverTraj, trajs.get(partner)!, tBurn, this.window);
      // re-screen the mover against everything else in the sky
      for (const [id, tr] of trajs) {
        if (id === mover || id === partner) continue;
        const ap = closestApproach(moverTraj, tr, tBurn, this.window);
        if (ap.miss <= this.threshold && (!newRisk || ap.miss < newRisk.ap.miss)) newRisk = { id, ap };
      }
      verdict = pair.miss <= this.threshold ? 'collide' : newRisk ? 'new' : 'clear';
    }

    this.el.dvTotal.textContent = `${dvMs.toFixed(1)} m/s`;
    const frac = Number.isFinite(fuelMs) && fuelMs > 0 ? Math.min(1, dvMs / fuelMs) : dvMs > 0 ? 1 : 0;
    this.el.fuelBar.style.width = `${(frac * 100).toFixed(1)}%`;
    this.el.fuelBar.classList.toggle('over', verdict === 'fuel');
    this.el.fuelText.textContent = Number.isFinite(fuelMs) ? `of ${fuelMs.toFixed(fuelMs < 1 ? 1 : 0)} m/s in the tank` : '';

    this.last = { mover, partner, burn, dvMs, verdict, trajs, baseline: this.baseline, original: this.original, pair, newRisk };
    this.renderVerdict();
    this.drawBullseye();
    this.host.onResult(this.last);
  }

  private renderVerdict() {
    const r = this.last!;
    const v = this.el.verdict, sub = this.el.verdictSub;
    v.className = `sb-verdict v-${r.verdict}`;
    const thr = this.threshold;
    switch (r.verdict) {
      case 'none':
        v.textContent = 'NO BURN — STILL ON COLLISION COURSE';
        sub.textContent = `Predicted miss ${r.original.miss.toFixed(2)} km. Push a slider.`;
        break;
      case 'fuel': {
        const fuel = (this.info[r.mover]?.fuel_budget_dv ?? 0) * 1000;
        v.textContent = '✗ REJECTED — NOT ENOUGH FUEL';
        sub.textContent = fuel < 1
          ? `${r.mover} has an empty tank (${fuel.toFixed(1)} m/s). It physically cannot dodge — someone else has to.`
          : `This burn needs ${r.dvMs.toFixed(1)} m/s; ${r.mover} only carries ${fuel.toFixed(0)} m/s.`;
        break;
      }
      case 'collide':
        v.textContent = '✗ STILL TOO CLOSE';
        sub.textContent = `Now ${r.pair.miss.toFixed(2)} km apart (was ${r.original.miss.toFixed(2)}). The referee needs more than ${thr} km.`;
        break;
      case 'new':
        v.textContent = `✗ NEW NEAR-MISS WITH ${r.newRisk!.id}`;
        sub.textContent = `You cleared ${r.partner} (${r.pair.miss.toFixed(1)} km), but your new orbit passes ` +
          `${r.newRisk!.ap.miss.toFixed(2)} km from ${r.newRisk!.id} at T+${fmtClock(r.newRisk!.ap.tca)}. A fix that creates a new problem isn't a fix.`;
        break;
      case 'clear':
        v.textContent = '⚖ CLEARS — REFEREE APPROVES';
        sub.textContent = `${r.pair.miss.toFixed(2)} km miss (was ${r.original.miss.toFixed(2)}), nothing else within ${thr} km for the next ${Math.round(this.window / 60)} minutes.`;
        break;
    }
    this.el.tip.textContent = this.tipFor(r);
    if (r.verdict === 'clear') this.recordBest(r.dvMs);
    this.updateScoreLine();
  }

  private tipFor(r: SandboxResult): string {
    const toTca = r.original.tca - r.burn.t;
    if (r.verdict === 'fuel') return 'Tip: switch who burns — or shrink the push.';
    if (r.verdict === 'collide' && toTca < 400)
      return 'Tip: burn earlier — drag WHEN to the left. A push has more time to grow into distance before you meet, so early burns are far cheaper.';
    if (r.verdict === 'collide')
      return 'Tip: “climb / dip” moves WHERE you cross; “speed up / slow down” moves WHEN you arrive. Both work — differently.';
    if (r.verdict === 'new') return 'Tip: try a different direction — the sky past the dodge is not empty.';
    if (r.verdict === 'clear' && this.agentsDvMs && r.dvMs < this.agentsDvMs)
      return `You beat the agents. They burned ${fmtClock(r.original.tca - this.agentsFirstBurnT)} before closest approach — ` +
        'late burns are expensive. Fuel is mission lifetime, so this is real money.';
    if (r.verdict === 'clear') return 'Approved. Can you clear it with less fuel?';
    return 'Pick who burns, when, and which way — the verdict updates live.';
  }

  private bestKey() { return `row-best-${this.scenarioKey}`; }

  private recordBest(dvMs: number) {
    try {
      const prev = Number(localStorage.getItem(this.bestKey()) ?? Infinity);
      if (dvMs < prev) localStorage.setItem(this.bestKey(), dvMs.toFixed(2));
    } catch { /* storage unavailable */ }
  }

  private updateScoreLine() {
    let best = Infinity;
    try { best = Number(localStorage.getItem(this.bestKey()) ?? Infinity); } catch { /* */ }
    const agents = this.agentsDvMs
      ? `Agents: <b>${this.agentsDvMs.toFixed(1)} m/s</b> in ${this.agentsBurns} burn${this.agentsBurns === 1 ? '' : 's'}`
      : '';
    const r = this.last;
    const you = r && r.verdict === 'clear' ? `You: <b class="sb-green">${r.dvMs.toFixed(1)} m/s</b>` : '';
    const delta = r && r.verdict === 'clear' && this.agentsDvMs
      ? (() => {
          const pct = Math.round((1 - r.dvMs / this.agentsDvMs) * 100);
          return pct > 0 ? ` <span class="sb-green">(${pct}% less)</span>` : pct < 0 ? ` <span class="sb-dim">(${-pct}% more)</span>` : '';
        })()
      : '';
    const bestTxt = Number.isFinite(best) ? `<span class="sb-dim">your best ${best.toFixed(1)} m/s</span>` : '';
    this.el.score.innerHTML = [agents, you + delta, bestTxt].filter(Boolean).join(' · ');
  }

  // ── bullseye: the miss geometry at closest approach ───────────────────────
  private drawBullseye() {
    const c = this.el.bull, r = this.last;
    const ctx = c.getContext('2d');
    if (!ctx || !r) return;
    const dpr = Math.min(devicePixelRatio, 2);
    const W = c.clientWidth, H = c.clientHeight;
    if (!W || !H) return;
    c.width = Math.round(W * dpr); c.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    const [a, b] = this.pairIds;
    const orig = missOffset(r.baseline.get(a)!, r.baseline.get(b)!, r.original.tca);
    const live = r.verdict === 'none' || r.verdict === 'fuel'
      ? orig
      : missOffset(r.trajs.get(a)!, r.trajs.get(b)!, r.pair.tca);
    const thr = this.threshold;
    const cx = W / 2, cy = H / 2, R = Math.min(W, H) / 2 - 14;
    const span = Math.max(thr * 2, 1.25 * Math.max(Math.hypot(...orig), Math.min(Math.hypot(...live), thr * 4)));
    const k = R / span;

    // rings
    ctx.font = '9.5px ui-monospace, SF Mono, Menlo, monospace';
    ctx.textAlign = 'left';
    const ringStep = span > 30 ? 10 : span > 12 ? 5 : 2.5;
    for (let d = ringStep; d <= span + 1e-6; d += ringStep) {
      ctx.strokeStyle = 'rgba(0,212,255,0.13)';
      ctx.beginPath(); ctx.arc(cx, cy, d * k, 0, Math.PI * 2); ctx.stroke();
    }
    // danger disc
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, thr * k);
    g.addColorStop(0, 'rgba(255,48,64,0.45)');
    g.addColorStop(1, 'rgba(255,48,64,0.12)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(cx, cy, thr * k, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(255,90,100,0.8)';
    ctx.setLineDash([3, 3]);
    ctx.beginPath(); ctx.arc(cx, cy, thr * k, 0, Math.PI * 2); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(255,140,148,0.9)';
    ctx.fillText(`${thr} km`, cx + thr * k * 0.72 + 3, cy + thr * k * 0.72 + 9);

    // crosshair + labels
    ctx.strokeStyle = 'rgba(0,212,255,0.18)';
    ctx.beginPath(); ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy); ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R); ctx.stroke();
    ctx.fillStyle = 'rgba(160,210,235,0.45)';
    ctx.textAlign = 'center';
    ctx.fillText('↑ away from Earth', cx, 10);
    ctx.fillText(`${b} sits at the center`, cx, H - 3);

    const toPx = ([x, y]: [number, number]): [number, number] => {
      const d = Math.hypot(x, y);
      const s = d * k > R ? R / (d * k) : 1; // clamp off-chart points to the rim
      return [cx + x * k * s, cy - y * k * s];
    };
    const po = toPx(orig), pl = toPx(live);
    const moved = Math.hypot(pl[0] - po[0], pl[1] - po[1]) > 1;

    if (moved) {
      ctx.strokeStyle = 'rgba(255,200,120,0.55)';
      ctx.setLineDash([2, 3]);
      ctx.beginPath(); ctx.moveTo(po[0], po[1]); ctx.lineTo(pl[0], pl[1]); ctx.stroke();
      ctx.setLineDash([]);
    }
    // original miss: red ×
    ctx.strokeStyle = '#ff5a64';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(po[0] - 4, po[1] - 4); ctx.lineTo(po[0] + 4, po[1] + 4);
    ctx.moveTo(po[0] + 4, po[1] - 4); ctx.lineTo(po[0] - 4, po[1] + 4);
    ctx.stroke();
    ctx.lineWidth = 1;
    // your miss
    if (moved) {
      const ok = r.verdict === 'clear';
      const col = ok ? '#3ddc97' : r.verdict === 'new' ? '#ffb03a' : '#ff5a64';
      ctx.fillStyle = col;
      ctx.shadowColor = col; ctx.shadowBlur = 10;
      ctx.beginPath(); ctx.arc(pl[0], pl[1], 5, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
      ctx.textAlign = pl[0] > cx ? 'right' : 'left';
      ctx.fillText(`${a} ${r.pair.miss.toFixed(1)} km`, pl[0] + (pl[0] > cx ? -9 : 9), pl[1] - 7);
    } else {
      ctx.fillStyle = '#ff7a82';
      ctx.textAlign = po[0] > cx ? 'right' : 'left';
      ctx.fillText(`${a} ${r.original.miss.toFixed(2)} km`, po[0] + (po[0] > cx ? -9 : 9), po[1] - 7);
    }
  }
}
