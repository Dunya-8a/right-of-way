// Close Call — a daily puzzle on a real predicted near-miss in orbit.
// Flow: intro (what's happening, plain language) → play (one burn, judged
// live by the in-browser referee) → result (your fuel vs. the best possible
// dodge vs. the AI agents, and the cost-of-waiting curve) → how the AI
// agents negotiated it.

import './app.css';
import { Globe } from './globe.js';
import { Puzzle, stars, type CurvePoint, type Judgement, type Shot } from './puzzle.js';
import { norm, vec, type Trajectory, type Vec3 } from './orbit.js';

interface IndexEntry { id: string; kind: 'daily' | 'classic' | 'practice'; date: string | null; title: string; file: string; number?: number; }
interface Saved { official?: { shot: Shot; dvMs: number; verdict: string; stars: number }; best?: number; }

const C = { amber: '#ffb347', blue: '#6cb8ff', safe: '#3ddc97', danger: '#ff5d6c', violet: '#b99cff', dim: '#6b7890' };
const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;

// ── state ─────────────────────────────────────────────────────────────────────
const globe = new Globe($('globe'));
let index: IndexEntry[] = [];
let entry: IndexEntry;
let puzzle: Puzzle;
let mover = '';
let along = 0, radial = 0;
let last: Judgement | null = null;
let practice = false; // a daily already has its official score
const curves = new Map<string, Promise<CurvePoint[]>>();

// ── storage ───────────────────────────────────────────────────────────────────
function load(id: string): Saved {
  try { return JSON.parse(localStorage.getItem(`cc:v1:${id}`) ?? '{}') as Saved; } catch { return {}; }
}
function save(id: string, s: Saved) {
  try { localStorage.setItem(`cc:v1:${id}`, JSON.stringify(s)); } catch { /* private mode */ }
}

// ── formatting ────────────────────────────────────────────────────────────────
const km = (d: number) => (d >= 100 ? `${Math.round(d).toLocaleString()} km` : d >= 10 ? `${d.toFixed(0)} km` : `${d.toFixed(1)} km`);
function dur(sec: number): string {
  const s = Math.round(sec);
  const m = Math.floor(s / 60), r = s % 60;
  if (m === 0) return `${r} s`;
  return r ? `${m} min ${r} s` : `${m} min`;
}
function longDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}
function shortDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
}
function esc(s: string) { return s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!)); }
function starStr(n: number) { return '★★★'.slice(0, n) + '☆☆☆'.slice(0, 3 - n); }
function toast(msg: string) {
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('on');
  setTimeout(() => t.classList.remove('on'), 2200);
}

function colorOf(id: string) {
  if (id === mover) return C.amber;
  if (puzzle.pair.includes(id)) return C.blue;
  return C.dim;
}
function name(id: string) { return puzzle.label(id); }

// ── screens ───────────────────────────────────────────────────────────────────
type Screen = 'intro' | 'play' | 'result' | 'agents' | 'archive' | 'about';
function show(s: Screen) {
  document.querySelectorAll<HTMLElement>('.screen').forEach(el => { el.hidden = el.id !== `screen-${s}`; });
  document.querySelectorAll<HTMLElement>('[data-nav]').forEach(b => {
    const on = (b.dataset['nav'] === 'today' && ['intro', 'play', 'result', 'agents'].includes(s)) || b.dataset['nav'] === s;
    if (on) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
  });
  window.scrollTo({ top: 0 });
  if (s === 'play') requestAnimationFrame(() => drawMiss());
}

// ── loading ───────────────────────────────────────────────────────────────────
async function openPuzzle(id: string) {
  const e = index.find(x => x.id === id) ?? index[index.length - 1];
  const tl = await fetch(`./puzzles/${e.file}`).then(r => r.json());
  entry = e;
  puzzle = new Puzzle(tl, e.id);
  mover = puzzle.defaultMover();
  along = radial = 0;
  practice = !!load(e.id).official && e.kind === 'daily';
  const url = new URL(location.href);
  url.searchParams.set('p', e.id);
  history.replaceState(null, '', url);
  setupGlobe();
  renderIntro();
  show('intro');
  curveFor(mover); // warm the solver while the player reads
}

function curveFor(id: string): Promise<CurvePoint[]> {
  const key = `${puzzle.id}:${id}`;
  if (!curves.has(key)) {
    const p = puzzle;
    // chunked so the page stays responsive while it searches
    curves.set(key, new Promise(resolve => {
      const out: CurvePoint[] = [];
      let tb = 0;
      const step = () => {
        const until = performance.now() + 12;
        while (tb <= p.original.tca - 15 && performance.now() < until) {
          const pt = p.cheapestAt(id, tb);
          if (pt) out.push(pt);
          tb += 15;
        }
        if (tb <= p.original.tca - 15) setTimeout(step, 0); else resolve(out);
      };
      setTimeout(step, 0);
    }));
  }
  return curves.get(key)!;
}

// ── globe ─────────────────────────────────────────────────────────────────────
function encounterPoint(): Vec3 {
  const [a, b] = puzzle.pair;
  const ra = puzzle.baseline.get(a)!.stateAt(puzzle.original.tca).r;
  const rb = puzzle.baseline.get(b)!.stateAt(puzzle.original.tca).r;
  return vec.scale(vec.add(ra, rb), 0.5);
}

function setupGlobe() {
  globe.setObjects(puzzle.pair.map(id => ({ id, label: name(id), color: colorOf(id) })));
  globe.setTrajectories(puzzle.baseline);
  const tca = puzzle.original.tca;
  globe.setTime(Math.max(0, tca - 150));
  globe.setPaths(puzzle.pair.map(id => ({
    traj: puzzle.baseline.get(id)!, t0: Math.max(0, tca - 600), t1: tca + 180,
    color: colorOf(id), opacity: 0.55,
  })));
  globe.setEncounter(encounterPoint(), C.danger);
  globe.setBurn(null, null);
  globe.frame(encounterPoint(), 0.9);
}

function updateGlobeForShot(j: Judgement) {
  const tca = puzzle.original.tca;
  const partner = puzzle.partnerOf(mover);
  const paths = [
    { traj: puzzle.baseline.get(partner)!, t0: Math.max(0, tca - 600), t1: tca + 180, color: C.blue, opacity: 0.55 },
    { traj: puzzle.baseline.get(mover)!, t0: j.shot.tBurn, t1: tca + 180, color: C.danger, dashed: true, opacity: 0.6 },
    { traj: puzzle.baseline.get(mover)!, t0: Math.max(0, tca - 600), t1: j.shot.tBurn, color: C.amber, opacity: 0.55 },
  ];
  if (j.dvMs > 0 && j.verdict !== 'fuel') {
    paths.push({ traj: j.traj, t0: j.shot.tBurn, t1: tca + 180, color: j.verdict === 'safe' ? C.safe : C.amber, opacity: 0.95 });
  }
  globe.setPaths(paths);
  const at = puzzle.baseline.get(mover)!.stateAt(j.shot.tBurn).r;
  globe.setBurn(j.dvMs > 0 ? at : null, j.dvMs > 0 ? puzzle.dvVector(j.shot) : null);
  globe.setTrajectories(new Map(puzzle.baseline));
  globe.setTime(j.shot.tBurn);
  globe.setEncounter(encounterPoint(), j.verdict === 'safe' ? C.safe : C.danger);
}

// ── intro ─────────────────────────────────────────────────────────────────────
function renderIntro() {
  const m = puzzle.meta;
  const [a, b] = puzzle.pair;
  $('intro-kicker').textContent =
    m.kind === 'daily' ? `Close Call #${m.number ?? entry.number ?? ''} · ${longDate(m.date!)}`
      : m.kind === 'classic' ? `Classic · ${longDate(m.date!)}` : 'Practice';
  $('intro-title').textContent =
    m.headline ?? `${name(a)} and ${name(b)} are on course to pass ${km(puzzle.original.miss)} apart.`;

  let lede = '';
  if (m.kind === 'daily' && m.source) {
    const tca = m.source.tca_utc ? new Date(m.source.tca_utc) : null;
    const when = tca ? `${tca.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', timeZone: 'UTC' })} at ${tca.toISOString().slice(11, 16)} UTC` : 'soon';
    const pred = m.source.predicted_miss_m != null ? ` about ${m.source.predicted_miss_m} m apart` : ' very close';
    const odds = m.source.max_probability ? ` (worst-case collision chance about 1 in ${Math.max(2, Math.round(1 / m.source.max_probability)).toLocaleString()})` : '';
    lede = `This is real. <a href="${m.source.url}" target="_blank" rel="noopener">${esc(m.source.name)}</a> predicts these two will pass${pred} on ${when}${odds}. ` +
      `Our simplified model puts the miss at ${km(puzzle.original.miss)}, still inside the 5 km safety bubble.`;
  } else if (m.context) {
    lede = esc(m.context);
  }
  $('intro-lede').innerHTML = lede;

  const hi = [...puzzle.pair].sort((x, y) => (puzzle.info[y]?.priority ?? 0) - (puzzle.info[x]?.priority ?? 0))[0];
  $('intro-objects').innerHTML = puzzle.pair.map(id => {
    const o = m.objects[id];
    const steer = puzzle.canSteer(id)
      ? `<span class="tag good">Can steer · ${puzzle.fuelMs(id).toFixed(0)} m/s of fuel</span>`
      : `<span class="tag bad">Can't steer</span>`;
    const row = id === hi && puzzle.info[a]?.priority !== puzzle.info[b]?.priority ? '<span class="tag row">Has right of way</span>' : '';
    return `<div class="obj" style="--c:${colorOf(id)}"><span class="obj-dot"></span>
      <span class="obj-name">${esc(name(id))}</span>
      <span class="obj-label">${esc(o?.label ?? '')}</span>
      <span class="obj-tags">${steer}${row}</span></div>`;
  }).join('');

  const v = puzzle.original.relSpeed;
  $('intro-facts').innerHTML = `
    <div><dt>Closing speed</dt><dd>${v.toFixed(1)} km/s<small>${Math.round(v / 0.95)}× a rifle bullet</small></dd></div>
    <div><dt>They meet in</dt><dd>${dur(puzzle.original.tca)}<small>in our model</small></dd></div>
    <div><dt>Safe distance</dt><dd>${puzzle.threshold} km<small>closer counts as a hit</small></dd></div>`;

  const steerers = puzzle.pair.filter(id => puzzle.canSteer(id));
  $('intro-job').textContent = steerers.length > 1
    ? `Pick which one fires its thrusters, and fire once so they pass more than ${puzzle.threshold} km apart. Use as little fuel as you can. For a satellite, fuel is lifespan.`
    : `Fire ${name(mover)}'s thrusters once so they pass more than ${puzzle.threshold} km apart. Use as little fuel as you can. For a satellite, fuel is lifespan.`;

  const saved = load(entry.id);
  $('intro-result').hidden = !saved.official;
  $('intro-start').textContent = saved.official ? (entry.kind === 'daily' ? 'Practice again' : 'Play again') : 'Start';
}

// ── play ──────────────────────────────────────────────────────────────────────
const when = $<HTMLInputElement>('when');
const pad = $('pad');
const knob = $('pad-knob');

function startPlay() {
  const steerers = puzzle.pair.filter(id => puzzle.canSteer(id));
  const who = $('play-who');
  who.innerHTML = '';
  who.hidden = steerers.length < 2;
  for (const id of steerers) {
    const b = document.createElement('button');
    b.setAttribute('role', 'radio');
    b.textContent = name(id);
    b.addEventListener('click', () => { mover = id; refreshWho(); setupGlobe(); judgeNow(); });
    b.dataset['id'] = id;
    who.appendChild(b);
  }
  refreshWho();
  when.min = '0';
  when.max = String(Math.floor((puzzle.original.tca - 15) / 5) * 5);
  when.step = '5';
  when.value = String(Math.max(0, Math.round((puzzle.original.tca - 180) / 5) * 5));
  along = radial = 0;
  $('hint-text').hidden = true;
  show('play');
  globe.frame(encounterPoint(), 1.25);
  judgeNow();
}

function refreshWho() {
  $('play-title').textContent = `Steer ${name(mover)}`;
  $('play-who').querySelectorAll<HTMLElement>('button').forEach(b => b.setAttribute('aria-checked', String(b.dataset['id'] === mover)));
  globe.setObjects(puzzle.pair.map(id => ({ id, label: name(id), color: colorOf(id) })));
}

function maxPush() { return puzzle.maxPush(mover); }

function placeKnob() {
  const r = pad.clientWidth / 2;
  const k = (r - 4) / maxPush();
  knob.style.left = `${r + along * k}px`;
  knob.style.top = `${r - radial * k}px`;
  const ring = $('pad-ring');
  const d = Math.hypot(along, radial) * k * 2;
  ring.style.width = ring.style.height = `${d}px`;
  ring.hidden = d < 2;
  pad.setAttribute('aria-valuetext',
    along === 0 && radial === 0 ? 'no push' :
      `${Math.hypot(along, radial).toFixed(1)} metres per second: ${along >= 0 ? 'speed up' : 'slow down'} ${Math.abs(along).toFixed(1)}, ${radial >= 0 ? 'climb' : 'dip'} ${Math.abs(radial).toFixed(1)}`);
}

function setPush(a: number, r: number) {
  const m = Math.hypot(a, r), cap = maxPush();
  if (m > cap) { a *= cap / m; r *= cap / m; }
  along = Math.round(a * 10) / 10;
  radial = Math.round(r * 10) / 10;
  placeKnob();
  scheduleJudge();
}

{
  let dragging = false;
  const fromEvent = (e: PointerEvent) => {
    const rect = pad.getBoundingClientRect();
    const r = rect.width / 2;
    const k = maxPush() / (r - 4);
    setPush((e.clientX - rect.left - r) * k, -(e.clientY - rect.top - r) * k);
  };
  pad.addEventListener('pointerdown', e => { dragging = true; pad.setPointerCapture(e.pointerId); fromEvent(e); });
  pad.addEventListener('pointermove', e => { if (dragging) fromEvent(e); });
  pad.addEventListener('pointerup', () => { dragging = false; });
  pad.addEventListener('pointercancel', () => { dragging = false; });
  pad.addEventListener('keydown', e => {
    const s = e.shiftKey ? 2 : 0.5;
    const moves: Record<string, [number, number]> = { ArrowLeft: [-s, 0], ArrowRight: [s, 0], ArrowUp: [0, s], ArrowDown: [0, -s] };
    const mv = moves[e.key];
    if (!mv) return;
    e.preventDefault();
    setPush(along + mv[0], radial + mv[1]);
  });
}
when.addEventListener('input', () => scheduleJudge());
$('reset').addEventListener('click', () => setPush(0, 0));
$('hint').addEventListener('click', () => {
  const h = $('hint-text');
  h.hidden = false;
  h.textContent = Number(when.value) > puzzle.original.tca - 300
    ? 'Fire earlier. A push has time to grow into distance, so the same fuel moves you much further if you act sooner. Drag “when to fire” to the left.'
    : '“Climb / dip” changes where you cross their path. “Speed up / slow down” changes when you get there. Try both. One is usually much cheaper.';
});

let pending = false;
function scheduleJudge() {
  if (pending) return;
  pending = true;
  requestAnimationFrame(() => { pending = false; judgeNow(); });
}

function judgeNow() {
  const tb = Number(when.value);
  $('when-val').textContent = `${dur(puzzle.original.tca - tb)} before they meet`;
  const shot: Shot = { mover, tBurn: tb, along, radial };
  last = puzzle.judge(shot);
  const j = last;
  placeKnob();
  $('push-val').textContent = j.dvMs > 0 ? `${j.dvMs.toFixed(1)} m/s push` : 'no push yet';
  const fuel = puzzle.fuelMs(mover);
  $('fuel-text').textContent = `${j.dvMs.toFixed(1)} of ${fuel.toFixed(0)} m/s`;
  const bar = $('fuel-bar');
  bar.style.width = `${Math.min(100, (j.dvMs / fuel) * 100)}%`;
  bar.classList.toggle('over', j.verdict === 'fuel');

  const st = $('play-status');
  st.className = `status ${j.verdict}`;
  const p = puzzle.partnerOf(mover);
  st.innerHTML = {
    none: `They'll pass ${km(puzzle.original.miss)} apart. Too close.<small>Drag the dot to push ${esc(name(mover))}.</small>`,
    fuel: `Not enough fuel.<small>${esc(name(mover))} only carries ${fuel.toFixed(0)} m/s.</small>`,
    close: `Still too close: ${km(j.pair.miss)} apart.<small>Safe means more than ${puzzle.threshold} km.</small>`,
    new: `Clear of ${esc(name(p))}, but now you'd pass ${km(j.newRisk?.ap.miss ?? 0)} from ${esc(name(j.newRisk?.id ?? ''))}.<small>A fix that causes a new near-miss doesn't count.</small>`,
    safe: `Safe: they'll pass ${km(j.pair.miss)} apart.<small>Can you do it with less fuel?</small>`,
  }[j.verdict];
  $<HTMLButtonElement>('fire').disabled = j.dvMs === 0;
  const mini = $('mini-status');
  mini.className = `mini ${j.verdict}`;
  mini.textContent = j.verdict === 'safe' ? `✓ ${km(j.pair.miss)} apart` : j.verdict === 'fuel' ? '✗ not enough fuel'
    : j.verdict === 'new' ? `⚠ near ${name(j.newRisk?.id ?? '')}` : `✗ ${km(j.verdict === 'none' ? puzzle.original.miss : j.pair.miss)}: too close`;
  drawMiss();
  updateGlobeForShot(j);
}

// The miss view: the other object at the centre, the 5 km danger zone around
// it, and where you'll pass — seen along the direction they approach.
function drawMiss() {
  const c = $<HTMLCanvasElement>('miss-canvas');
  const ctx = c.getContext('2d');
  if (!ctx || !last || !c.clientWidth) return;
  const dpr = Math.min(devicePixelRatio, 2);
  const W = c.clientWidth, H = c.clientHeight;
  c.width = W * dpr; c.height = H * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, W, H);
  const thr = puzzle.threshold;
  const orig = puzzle.originalOffset, now = last.offset;
  const span = Math.max(thr * 1.8, Math.min(Math.max(Math.hypot(...now), Math.hypot(...orig)) * 1.25, thr * 5));
  const R = Math.min(W, H) / 2 - 18;
  const k = R / span, cx = W / 2, cy = H / 2;
  const font = (w: number, s: number) => `${w} ${s}px Inter, system-ui, sans-serif`;

  // distance rings
  ctx.strokeStyle = 'rgba(154,167,189,0.16)';
  ctx.fillStyle = 'rgba(154,167,189,0.55)';
  ctx.font = font(400, 11);
  ctx.textAlign = 'left';
  const stepKm = span > 20 ? 10 : 5;
  for (let d = stepKm; d <= span; d += stepKm) {
    if (d === thr) continue;
    ctx.beginPath(); ctx.arc(cx, cy, d * k, 0, Math.PI * 2); ctx.stroke();
    ctx.fillText(`${d} km`, cx + d * k * 0.71 + 4, cy - d * k * 0.71);
  }
  // danger zone
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, thr * k);
  g.addColorStop(0, 'rgba(255,93,108,0.42)');
  g.addColorStop(1, 'rgba(255,93,108,0.14)');
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(cx, cy, thr * k, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = 'rgba(255,93,108,0.85)';
  ctx.setLineDash([4, 4]);
  ctx.beginPath(); ctx.arc(cx, cy, thr * k, 0, Math.PI * 2); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = '#ff9aa4';
  ctx.font = font(600, 11);
  ctx.textAlign = 'right';
  ctx.fillText('danger zone', cx - thr * k - 6, cy + thr * k * 0.75);
  ctx.textAlign = 'center';

  // the other object
  const partner = puzzle.partnerOf(mover);
  ctx.fillStyle = C.blue;
  ctx.shadowColor = C.blue; ctx.shadowBlur = 12;
  ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2); ctx.fill();
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#cfe6ff';
  ctx.font = font(600, 11.5);
  ctx.fillText(name(partner), cx, cy - 10);

  ctx.font = font(400, 11);
  ctx.fillStyle = 'rgba(154,167,189,0.6)';
  ctx.fillText('↑ away from Earth', cx, 12);

  const px = ([x, y]: [number, number]): [number, number] => {
    const d = Math.hypot(x, y), s = d * k > R ? R / (d * k) : 1;
    return [cx + x * k * s, cy - y * k * s];
  };
  const po = px(orig), pn = px(now);
  const moved = Math.hypot(pn[0] - po[0], pn[1] - po[1]) > 2;
  // where you'd pass with no burn
  ctx.strokeStyle = C.danger; ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(po[0] - 5, po[1] - 5); ctx.lineTo(po[0] + 5, po[1] + 5);
  ctx.moveTo(po[0] + 5, po[1] - 5); ctx.lineTo(po[0] - 5, po[1] + 5);
  ctx.stroke(); ctx.lineWidth = 1;
  if (moved) {
    ctx.strokeStyle = 'rgba(255,179,71,0.6)'; ctx.setLineDash([3, 3]);
    ctx.beginPath(); ctx.moveTo(po[0], po[1]); ctx.lineTo(pn[0], pn[1]); ctx.stroke();
    ctx.setLineDash([]);
    const col = last.verdict === 'safe' ? C.safe : last.verdict === 'new' ? C.amber : C.amber;
    ctx.fillStyle = col; ctx.shadowColor = col; ctx.shadowBlur = 14;
    ctx.beginPath(); ctx.arc(pn[0], pn[1], 7, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;
  }
  const lp = moved ? pn : po;
  ctx.font = font(600, 12);
  ctx.fillStyle = moved ? (last.verdict === 'safe' ? C.safe : C.amber) : '#ff9aa4';
  ctx.textAlign = lp[0] > cx ? 'right' : 'left';
  ctx.fillText(moved ? 'you pass here' : 'you pass here now', lp[0] + (lp[0] > cx ? -12 : 12), lp[1] + 4);
}
new ResizeObserver(() => drawMiss()).observe($('miss-canvas'));

// ── fire! ─────────────────────────────────────────────────────────────────────
$('fire').addEventListener('click', () => {
  if (!last || last.dvMs === 0) return;
  const j = last;
  const saved = load(entry.id);
  const official = !practice;
  // stars are filled in by renderResult once the best possible dodge is known
  if (official) saved.official = { shot: j.shot, dvMs: j.dvMs, verdict: j.verdict, stars: 0 };
  if (j.verdict === 'safe') saved.best = Math.min(saved.best ?? Infinity, j.dvMs);
  save(entry.id, saved);
  if (official && puzzle.meta.kind === 'daily') practice = true;
  fly(j).then(() => renderResult(j, official ? 'official' : 'practice'));
});

function fly(j: Judgement): Promise<void> {
  const trajs = new Map(puzzle.baseline);
  trajs.set(mover, j.traj);
  return flyWith(trajs, Math.max(0, j.shot.tBurn - 20), puzzle.original.tca + 30, j.verdict === 'safe' ? C.safe : C.danger);
}

function flyWith(trajs: Map<string, Trajectory>, t0: number, t1: number, endColor: string): Promise<void> {
  const [a, b] = puzzle.pair;
  globe.setTrajectories(trajs);
  globe.frame(encounterPoint(), 1.2);
  let closeUp = false;
  const hud = $('fly-hud');
  hud.classList.add('on');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  return new Promise(resolve => {
    let t = t0;
    let prev = performance.now();
    const step = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      const d = norm(vec.sub(trajs.get(a)!.stateAt(t).r, trajs.get(b)!.stateAt(t).r));
      // slow-motion near the pass: the clock rate follows the distance
      const rate = reduce ? 1e6 : Math.max(4, Math.min(160, d * 0.5));
      t = Math.min(t1, t + dt * rate);
      globe.setTime(t);
      const close = d < 60;
      if (!closeUp && d < 300) { closeUp = true; globe.frame(encounterPoint(), 0.25); }
      hud.innerHTML = `${km(d)} apart<small>${close ? 'closest approach…' : `${dur(Math.max(0, puzzle.original.tca - t))} to go`}</small>`;
      hud.style.color = d <= puzzle.threshold ? C.danger : close ? endColor : '#e8edf5';
      if (t < t1) requestAnimationFrame(step);
      else setTimeout(() => { hud.classList.remove('on'); resolve(); }, reduce ? 0 : 700);
    };
    requestAnimationFrame(step);
  });
}

// ── result ────────────────────────────────────────────────────────────────────
async function renderResult(j: Judgement, mode: 'official' | 'practice' | 'review') {
  const official = mode !== 'practice';
  const m = puzzle.meta;
  $('result-kicker').textContent = `${m.kind === 'daily' ? `Close Call #${m.number}` : m.title}${official ? '' : ' · practice'}`;
  const safe = j.verdict === 'safe';
  $('result-title').textContent = safe ? `Safe pass: ${km(j.pair.miss)} apart` : {
    close: `Too close: ${km(j.pair.miss)} apart`,
    new: `You missed ${name(puzzle.partnerOf(j.shot.mover))}, but nearly hit ${name(j.newRisk?.id ?? '')}`,
    fuel: 'Not enough fuel',
    none: 'No burn',
  }[j.verdict as 'close' | 'new' | 'fuel' | 'none'];
  $('result-stars').innerHTML = '';
  $('result-lede').textContent = `${name(j.shot.mover)} fired ${dur(puzzle.original.tca - j.shot.tBurn)} before the encounter, using ${j.dvMs.toFixed(1)} m/s of fuel.`;
  $('result-bars').innerHTML = '';
  $('curve-svg').innerHTML = '<p class="muted">Working out the best possible dodge…</p>';
  $('curve-insight').textContent = '';
  show('result');

  const curve = await curveFor(j.shot.mover);
  const best = curve.length ? curve.reduce((x, y) => (y.dvMs < x.dvMs ? y : x)) : null;
  const ai = puzzle.agentBurns();
  const aiTotal = puzzle.agentsTotalMs();
  const n = safe && best ? stars(j.dvMs, best.dvMs) : 0;
  $('result-stars').innerHTML = `${'★'.repeat(n)}<span class="off">${'★'.repeat(3 - n)}</span>`;
  $('result-stars').setAttribute('aria-label', `${n} of 3 stars`);
  if (mode === 'official') {
    const saved = load(entry.id);
    if (saved.official) { saved.official.stars = n; save(entry.id, saved); }
  }

  const rows = [
    { label: 'You', v: j.dvMs, c: safe ? C.amber : C.danger, note: safe ? '' : ' (not safe)' },
    ...(best ? [{ label: 'Best possible', v: best.dvMs, c: C.safe, note: '' }] : []),
    ...(aiTotal ? [{ label: 'AI agents', v: aiTotal, c: C.violet, note: ai.length > 1 ? ` (${ai.length} burns)` : '' }] : []),
  ];
  const maxV = Math.max(...rows.map(r => r.v), 1);
  $('result-bars').innerHTML = rows.map(r => `
    <div class="bar-row" style="--c:${r.c}">
      <span class="who-l">${r.label}${r.note}</span>
      <span class="track"><span class="fill" style="width:0"></span></span>
      <span class="num">${r.v.toFixed(1)} m/s</span>
    </div>`).join('');
  requestAnimationFrame(() => {
    $('result-bars').querySelectorAll<HTMLElement>('.fill').forEach((f, i) => { f.style.width = `${(rows[i].v / maxV) * 100}%`; });
  });

  renderCurve(curve, j, best);
}

function renderCurve(curve: CurvePoint[], j: Judgement, best: CurvePoint | null) {
  if (!curve.length) { $('curve-svg').innerHTML = '<p class="muted">No safe single burn exists for this satellite.</p>'; return; }
  const W = 400, H = 210, L = 38, Rr = 12, T = 12, B = 34;
  const tca = puzzle.original.tca;
  const leadMax = Math.ceil(tca / 60) * 60;
  const aiFirst = puzzle.agentBurns()[0];
  const you = { lead: tca - j.shot.tBurn, v: j.dvMs };
  const ai = aiFirst && aiFirst.id === j.shot.mover ? { lead: tca - aiFirst.t, v: aiFirst.dvMs } : aiFirst ? { lead: tca - aiFirst.t, v: aiFirst.dvMs } : null;
  const yMax = Math.min(60, Math.max(...curve.map(c => c.dvMs), you.v, ai?.v ?? 0) * 1.15);
  const x = (lead: number) => L + (1 - lead / leadMax) * (W - L - Rr); // left = earlier
  const y = (v: number) => T + (1 - Math.min(v, yMax) / yMax) * (H - T - B);
  const pts = [...curve].sort((p, q) => q.lead - p.lead);
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${x(p.lead).toFixed(1)},${y(p.dvMs).toFixed(1)}`).join(' ');
  const area = `${d} L${x(pts[pts.length - 1].lead).toFixed(1)},${y(0)} L${x(pts[0].lead).toFixed(1)},${y(0)} Z`;
  const xt: string[] = [];
  for (let mnt = Math.floor(leadMax / 60); mnt >= 0; mnt -= mnt > 6 ? 2 : 1) {
    xt.push(`<text x="${x(mnt * 60)}" y="${H - B + 16}" text-anchor="middle">${mnt === 0 ? 'meet' : `${mnt}m`}</text>`);
  }
  const yt: string[] = [];
  const ys = yMax > 30 ? 10 : 5;
  for (let v = 0; v <= yMax; v += ys) {
    yt.push(`<line x1="${L}" x2="${W - Rr}" y1="${y(v)}" y2="${y(v)}" stroke="rgba(154,167,189,0.12)"/><text x="${L - 6}" y="${y(v) + 4}" text-anchor="end">${v}</text>`);
  }
  const dot = (p: { lead: number; v: number }, c: string, label: string, place: 'above' | 'right' = 'above') =>
    `<circle cx="${x(p.lead)}" cy="${y(p.v)}" r="6" fill="${c}" stroke="#0b1222" stroke-width="2"/>
     <text class="pt-label" x="${x(p.lead) + (place === 'right' ? 10 : 0)}" y="${y(p.v) + (place === 'right' ? 16 : -11)}"
       text-anchor="${place === 'right' ? 'start' : 'middle'}" style="fill:${c}">${label}</text>`;
  $('curve-svg').innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Fuel needed falls the earlier you fire">
      ${yt.join('')}
      <path d="${area}" fill="rgba(61,220,151,0.08)"/>
      <path d="${d}" fill="none" stroke="${C.safe}" stroke-width="2.2"/>
      ${xt.join('')}
      <text x="${(L + W - Rr) / 2}" y="${H - 2}" text-anchor="middle">time before they meet →</text>
      <text x="4" y="${T + 2}" text-anchor="start">m/s</text>
      ${ai ? dot(ai, C.violet, 'AI') : ''}
      ${best ? dot({ lead: best.lead, v: best.dvMs }, C.safe, 'best', 'right') : ''}
      ${dot(you, j.verdict === 'safe' ? C.amber : C.danger, 'you')}
    </svg>`;

  // one plain sentence about what the curve says
  let s = '';
  const needAtYourTime = curve.reduce((p, q) => (Math.abs(q.lead - you.lead) < Math.abs(p.lead - you.lead) ? q : p));
  if (best && you.lead < best.lead - 60 && j.verdict === 'safe') {
    const save = Math.round((1 - best.dvMs / j.dvMs) * 100);
    s = `Firing ${dur(best.lead - you.lead)} earlier would have cut your fuel by about ${save}%.`;
  } else if (j.verdict === 'safe' && best && j.dvMs > needAtYourTime.dvMs * 1.2) {
    s = `At the moment you fired, ${needAtYourTime.dvMs.toFixed(1)} m/s pushed in the right direction would have been enough.`;
  } else if (j.verdict === 'safe') {
    s = 'That’s close to the cheapest possible dodge.';
  } else {
    s = `At the moment you fired, the cheapest safe push was ${needAtYourTime.dvMs.toFixed(1)} m/s.`;
  }
  if (ai && best) s += ` The AI agents fired ${dur(ai.lead)} out and spent ${(puzzle.agentsTotalMs() / best.dvMs).toFixed(1)}× the minimum.`;
  $('curve-insight').textContent = s;
}

// ── share ─────────────────────────────────────────────────────────────────────
$('share').addEventListener('click', async () => {
  const saved = load(entry.id);
  const o = saved.official;
  const m = puzzle.meta;
  const head = m.kind === 'daily' ? `Close Call #${m.number} · ${shortDate(m.date!)}` : `Close Call · ${m.title}`;
  const line = o
    ? o.verdict === 'safe' ? `✅ Safe pass on ${o.dvMs.toFixed(1)} m/s of fuel ${starStr(o.stars)}` : '❌ Too close. Back to the drawing board.'
    : last?.verdict === 'safe' ? `✅ Safe pass on ${last.dvMs.toFixed(1)} m/s (practice)` : '❌ Not yet';
  const ai = puzzle.agentsTotalMs();
  const url = `${location.origin}${location.pathname}?p=${encodeURIComponent(entry.id)}`;
  const text = `${head} 🛰️\n${line}\n${ai ? `AI agents: ${ai.toFixed(1)} m/s\n` : ''}${url}`;
  try {
    if (navigator.share && matchMedia('(pointer: coarse)').matches) await navigator.share({ text });
    else { await navigator.clipboard.writeText(text); toast('Result copied, ready to paste'); }
  } catch { /* user cancelled */ }
});

// ── AI agents ─────────────────────────────────────────────────────────────────
const KIND_LABEL: Record<string, string> = {
  propose: 'proposes a burn', counter: 'pushes back', accept: 'accepts', yield: 'gives way', reject: 'rejects',
};

function renderAgents() {
  const brain = puzzle.meta.agents_brain;
  $('agents-brain').textContent =
    brain === 'offline' ? 'Today’s run used the offline stand-in agents (simple rules, not a language model), so the wording is plain.'
      : brain ? `Agents: ${brain}.` : 'Agents: Claude (Anthropic), one instance per satellite.';
  const list = $('transcript');
  list.innerHTML = '';
  let prev = '';
  for (const e of puzzle.tl.events) {
    let html = '';
    if (e.type === 'comms') {
      const d = e.data;
      const from = String(d['from_id'] ?? '?');
      const text = String(d['rationale'] ?? '');
      const sig = `${from}|${text}`;
      if (!text || sig === prev) continue; // the same words, re-sent as another protocol message
      prev = sig;
      const isRef = from === 'REFEREE';
      const kind = d['audit_failed'] ? 'claim rejected' : d['cannot_maneuver'] ? 'says it can’t move'
        : d['concede_row'] ? 'gives way' : d['assert_row'] ? 'claims right of way' : KIND_LABEL[String(d['kind'])] ?? String(d['kind'] ?? '');
      const c = isRef ? '#cfe6ff' : puzzle.pair.includes(from) ? colorOf(from) : C.violet;
      html = `<li class="msg${isRef ? ' referee' : ''}" style="--c:${c}">
        <div class="msg-head"><span class="msg-from">${isRef ? '⚖ Physics referee' : esc(name(from))}</span><span class="msg-kind">${esc(kind)}</span></div>
        <div class="msg-text">${esc(text)}</div></li>`;
    } else if (e.type === 'maneuver_committed') {
      const ms = (e.data['est_dv_cost'] as number) * 1000;
      html = `<li class="msg referee"><div class="msg-head"><span class="msg-from">⚖ Physics referee</span><span class="msg-kind">burn approved</span></div>
        <div class="msg-text">${esc(name(String(e.data['obj_id'])))} fires ${ms.toFixed(1)} m/s, ${dur(puzzle.original.tca - (e.data['t_burn'] as number))} before the encounter. Re-checked: it clears.</div></li>`;
    } else if (e.type === 'new_conjunction') {
      html = `<li class="msg referee"><div class="msg-head"><span class="msg-from">⚖ Physics referee</span><span class="msg-kind">new risk</span></div>
        <div class="msg-text">That dodge puts ${esc(name(String(e.data['a_id'])))} and ${esc(name(String(e.data['b_id'])))} ${km(e.data['miss_distance_km'] as number)} apart. Back to the table.</div></li>`;
    } else if (e.type === 'resolved') {
      html = `<li class="msg referee"><div class="msg-head"><span class="msg-from">⚖ Physics referee</span><span class="msg-kind">all clear</span></div>
        <div class="msg-text">No close approaches left. Total fuel: ${puzzle.agentsTotalMs().toFixed(1)} m/s.</div></li>`;
    }
    if (html) list.insertAdjacentHTML('beforeend', html);
  }
  const legacy: Record<string, string> = { aeolus: 'aeolus', liar: 'liar', 'forced-trade': 'forced-trade', live: 'live' };
  $<HTMLAnchorElement>('directors-cut').href = `replay.html?timeline=${encodeURIComponent(legacy[entry.id] ?? entry.id)}&autoplay`;
  show('agents');
}

$('to-agents').addEventListener('click', renderAgents);
$('agents-back').addEventListener('click', () => show('result'));
$('replay-ai').addEventListener('click', () => {
  const trajs = puzzle.agentTrajectories();
  const burns = puzzle.agentBurns();
  globe.setPaths(puzzle.pair.map(id => ({ traj: trajs.get(id)!, t0: Math.max(0, puzzle.original.tca - 600), t1: puzzle.original.tca + 180, color: burns.some(b => b.id === id) ? C.violet : C.blue, opacity: 0.8 })));
  globe.setBurn(null, null);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  flyWith(trajs, Math.max(0, (burns[0]?.t ?? 0) - 20), puzzle.original.tca + 30, C.violet);
});

// ── archive ───────────────────────────────────────────────────────────────────
function renderArchive() {
  const groups: [string, IndexEntry[]][] = [
    ['Daily close calls', index.filter(e => e.kind === 'daily').reverse()],
    ['Classics', index.filter(e => e.kind === 'classic')],
    ['Practice', index.filter(e => e.kind === 'practice')],
  ];
  $('archive-list').innerHTML = groups.filter(([, es]) => es.length).map(([h, es]) => `
    <div class="arch-group"><h2>${h}</h2>
      ${es.map(e => {
        const o = load(e.id).official;
        const score = o ? (o.verdict === 'safe' ? `<span class="arch-score">${starStr(o.stars)}</span>` : '<span class="arch-score">✗</span>')
          : '<span class="arch-score none">not played</span>';
        const sub = e.kind === 'daily' ? `#${e.number} · ${shortDate(e.date!)}` : e.date ? shortDate(e.date) : 'made-up scenario';
        return `<button class="arch-item" data-id="${esc(e.id)}"><span class="arch-title">${esc(e.title)}</span><span class="arch-sub">${sub}</span>${score}</button>`;
      }).join('')}
    </div>`).join('');
  $('archive-list').querySelectorAll<HTMLElement>('.arch-item').forEach(b =>
    b.addEventListener('click', () => openPuzzle(b.dataset['id']!)));
  show('archive');
}

// ── wiring ────────────────────────────────────────────────────────────────────
$('intro-start').addEventListener('click', startPlay);
$('intro-result').addEventListener('click', () => {
  const o = load(entry.id).official;
  if (!o?.shot) return;
  mover = o.shot.mover;
  const j = puzzle.judge(o.shot);
  updateGlobeForShot(j);
  renderResult(j, 'review');
});
$('again').addEventListener('click', () => { practice = puzzle.meta.kind === 'daily'; startPlay(); });
$('more').addEventListener('click', renderArchive);
document.querySelectorAll<HTMLElement>('[data-nav]').forEach(b => b.addEventListener('click', () => {
  const n = b.dataset['nav'];
  if (n === 'today') {
    const today = [...index].reverse().find(e => e.kind === 'daily');
    if (today && today.id !== entry?.id) openPuzzle(today.id); else { renderIntro(); show('intro'); setupGlobe(); }
  } else if (n === 'archive') renderArchive();
  else if (n === 'about') show('about');
}));

// ── boot ──────────────────────────────────────────────────────────────────────
fetch('./puzzles/index.json')
  .then(r => r.json())
  .then((idx: IndexEntry[]) => {
    index = idx;
    const want = new URLSearchParams(location.search).get('p');
    const today = [...idx].reverse().find(e => e.kind === 'daily') ?? idx[idx.length - 1];
    return openPuzzle(want && idx.some(e => e.id === want) ? want : today.id);
  })
  .catch(err => {
    console.error(err);
    $('intro-title').textContent = 'Could not load today’s close call.';
  });
