import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

// ── Timeline contract (mirrors web/types.ts) ─────────────────────────────────
type Vec3 = [number, number, number];
interface FrameObject { id: string; r: Vec3; }
interface Frame { t: number; objects: FrameObject[]; }
interface TLEvent { t: number; type: string; data: Record<string, unknown>; }
interface Timeline { meta: Record<string, unknown>; frames: Frame[]; events: TLEvent[]; }

// ── Scene constants ───────────────────────────────────────────────────────────
const EARTH_KM = 6371;
const ORBIT_KM = 6878;           // normalisation reference
const S = 1 / ORBIT_KM;          // km → scene units; LEO orbit ≈ 1.0 units
const EARTH_R = EARTH_KM * S;    // ~0.926

const COL = {
  BG:       0x050510,
  EARTH:    0x0a1a3a,
  GRID:     0x0d2a5c,
  NORMAL:   0x00d4ff,
  DANGER:   0xff2020,
  SAFE:     0x00ff88,
  PROPOSAL: 0xffaa00,
  DEBRIS:   0x888888,
  TRAIL:    0x003355,
};

const TRAIL_MAX = 40;  // history points per satellite

// ── DOM refs ─────────────────────────────────────────────────────────────────
const canvasEl   = document.getElementById('canvas')    as HTMLCanvasElement;
const labelRoot  = document.getElementById('label-root')!;
const playBtn    = document.getElementById('play-btn')!;
const scrubber   = document.getElementById('scrubber')  as HTMLInputElement;
const timeDsp    = document.getElementById('time-display')!;
const speedSel   = document.getElementById('speed-select') as HTMLSelectElement;
const phaseBadge = document.getElementById('phase-badge')!;
const phaseText  = document.getElementById('phase-text')!;
const eventLog   = document.getElementById('event-log')!;
const subtitleEl = document.getElementById('subtitle')!;

// ── Renderer + scene setup ────────────────────────────────────────────────────
const renderer = new THREE.WebGLRenderer({ canvas: canvasEl, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.setClearColor(COL.BG);

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(innerWidth, innerHeight);
labelRenderer.domElement.style.cssText = 'position:absolute;top:0;left:0;pointer-events:none;';
labelRoot.appendChild(labelRenderer.domElement);

const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.005, 200);
camera.position.set(0, 0.6, 3.0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 1.1;
controls.maxDistance = 20;

// Lights
scene.add(new THREE.AmbientLight(0x334455, 0.9));
const sun = new THREE.DirectionalLight(0xffffff, 1.1);
sun.position.set(6, 4, 5);
scene.add(sun);

// Stars
{
  const verts: number[] = [];
  for (let i = 0; i < 2500; i++) {
    const r = 60 + Math.random() * 60;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    verts.push(r * Math.sin(ph) * Math.cos(th), r * Math.sin(ph) * Math.sin(th), r * Math.cos(ph));
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  scene.add(new THREE.Points(g, new THREE.PointsMaterial({ color: 0xffffff, size: 0.06, sizeAttenuation: false })));
}

// Earth body
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(EARTH_R, 64, 32),
  new THREE.MeshPhongMaterial({ color: COL.EARTH, emissive: 0x061228, emissiveIntensity: 0.4, shininess: 12 }),
);
scene.add(earth);

// Grid lines on Earth
scene.add(new THREE.Mesh(
  new THREE.SphereGeometry(EARTH_R * 1.002, 24, 12),
  new THREE.MeshBasicMaterial({ color: COL.GRID, wireframe: true, transparent: true, opacity: 0.12 }),
));

// Atmosphere glow (backside sphere)
scene.add(new THREE.Mesh(
  new THREE.SphereGeometry(EARTH_R * 1.05, 48, 24),
  new THREE.MeshPhongMaterial({ color: 0x0d3a6e, transparent: true, opacity: 0.12, side: THREE.BackSide }),
));

// ── Satellite objects ─────────────────────────────────────────────────────────
interface SatObj {
  mesh:       THREE.Mesh;
  glow:       THREE.Mesh;
  trailLine:  THREE.Line;
  trailBuf:   THREE.BufferAttribute;
  trailPts:   THREE.Vector3[];
  nameLabel:  CSS2DObject;
}

const sats = new Map<string, SatObj>();

function isDebris(id: string) { return id.toLowerCase().includes('debris'); }

function makeSat(id: string): SatObj {
  const baseColor = isDebris(id) ? COL.DEBRIS : COL.NORMAL;
  const r = isDebris(id) ? 0.007 : 0.012;

  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(r, 14, 8),
    new THREE.MeshPhongMaterial({ color: baseColor, emissive: baseColor, emissiveIntensity: 0.55 }),
  );

  const glow = new THREE.Mesh(
    new THREE.SphereGeometry(r * 2.8, 10, 6),
    new THREE.MeshBasicMaterial({ color: baseColor, transparent: true, opacity: 0.12 }),
  );
  mesh.add(glow);

  // Name label
  const div = document.createElement('div');
  div.className = 'sat-label';
  div.textContent = id;
  const nameLabel = new CSS2DObject(div);
  nameLabel.position.set(0, r * 3.5, 0);
  mesh.add(nameLabel);

  // Trail geometry — preallocate TRAIL_MAX * 3 floats
  const buf = new THREE.Float32BufferAttribute(new Float32Array(TRAIL_MAX * 3), 3);
  const trailGeom = new THREE.BufferGeometry();
  trailGeom.setAttribute('position', buf);
  trailGeom.setDrawRange(0, 0);
  const trailMat = new THREE.LineBasicMaterial({ color: COL.TRAIL, transparent: true, opacity: 0.45 });
  const trailLine = new THREE.Line(trailGeom, trailMat);

  scene.add(mesh);
  scene.add(trailLine);

  return { mesh, glow, trailLine, trailBuf: buf, trailPts: [], nameLabel };
}

function clearSats() {
  sats.forEach(s => { scene.remove(s.mesh); scene.remove(s.trailLine); });
  sats.clear();
}

function initSats(ids: string[]) {
  clearSats();
  ids.forEach(id => sats.set(id, makeSat(id)));
}

// ── Conjunction / proposal overlays ──────────────────────────────────────────
interface ConjState { aId: string; bId: string; miss: number; }

let activeConjs: ConjState[] = [];
let isResolved = false;

// Conjunction lines and miss-distance labels
const conjLines  = new Map<string, THREE.Line>();       // key = sorted "a:b"
const conjMidPts = new Map<string, CSS2DObject>();      // same key

function ck(a: string, b: string) { return [a, b].sort().join(':'); }

function upsertConjLine(a: string, b: string) {
  const key = ck(a, b);
  if (conjLines.has(key)) return;
  const pts = [new THREE.Vector3(), new THREE.Vector3()];
  const g = new THREE.BufferGeometry().setFromPoints(pts);
  const line = new THREE.Line(g, new THREE.LineBasicMaterial({ color: COL.DANGER }));
  scene.add(line);
  conjLines.set(key, line);
}

function removeConjLine(key: string) {
  const line = conjLines.get(key);
  if (line) { scene.remove(line); line.geometry.dispose(); conjLines.delete(key); }
  const mid = conjMidPts.get(key);
  if (mid) { scene.remove(mid); conjMidPts.delete(key); }
}

function clearAllConj() {
  [...conjLines.keys()].forEach(k => removeConjLine(k));
}

function updateConjLinePositions() {
  conjLines.forEach((line, key) => {
    const [aId, bId] = key.split(':');
    const sa = sats.get(aId), sb = sats.get(bId);
    if (!sa || !sb) return;
    const pa = sa.mesh.position, pb = sb.mesh.position;
    const pos = line.geometry.attributes.position as THREE.BufferAttribute;
    pos.setXYZ(0, pa.x, pa.y, pa.z);
    pos.setXYZ(1, pb.x, pb.y, pb.z);
    pos.needsUpdate = true;
    line.geometry.computeBoundingSphere();
  });
}

// Miss distance label at midpoint of conj line
function syncConjLabels() {
  activeConjs.forEach(c => {
    const key = ck(c.aId, c.bId);
    const sa = sats.get(c.aId), sb = sats.get(c.bId);
    if (!sa || !sb) return;
    const mid = new THREE.Vector3().addVectors(sa.mesh.position, sb.mesh.position).multiplyScalar(0.5);
    let obj = conjMidPts.get(key);
    if (!obj) {
      const div = document.createElement('div');
      div.className = 'conj-label';
      div.textContent = `${c.miss.toFixed(1)} km`;
      obj = new CSS2DObject(div);
      scene.add(obj);
      conjMidPts.set(key, obj);
    }
    obj.position.copy(mid);
  });
}

// Proposal animated link
let propLine:   THREE.Line   | null = null;
let propPacket: THREE.Mesh   | null = null;
let propFrom:   string | null = null;
let propTo:     string | null = null;
let propWall0:  number = 0;

function startProposal(fromId: string, toId: string) {
  clearProposal();
  const g = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
  propLine = new THREE.Line(g, new THREE.LineBasicMaterial({ color: COL.PROPOSAL, transparent: true, opacity: 0.7 }));
  scene.add(propLine);

  propPacket = new THREE.Mesh(
    new THREE.SphereGeometry(0.016, 8, 6),
    new THREE.MeshBasicMaterial({ color: COL.PROPOSAL }),
  );
  scene.add(propPacket);

  propFrom = fromId; propTo = toId; propWall0 = performance.now();
}

function clearProposal() {
  if (propLine)   { scene.remove(propLine);   propLine = null; }
  if (propPacket) { scene.remove(propPacket); propPacket = null; }
  propFrom = propTo = null;
}

function updateProposal(wallMs: number) {
  if (!propLine || !propPacket || !propFrom || !propTo) return;
  const sa = sats.get(propFrom), sb = sats.get(propTo);
  if (!sa || !sb) return;
  const pf = sa.mesh.position, pt = sb.mesh.position;
  const pos = propLine.geometry.attributes.position as THREE.BufferAttribute;
  pos.setXYZ(0, pf.x, pf.y, pf.z);
  pos.setXYZ(1, pt.x, pt.y, pt.z);
  pos.needsUpdate = true;
  propLine.geometry.computeBoundingSphere();

  // Packet oscillates along line (ping-pong)
  const t = ((wallMs - propWall0) / 2200) % 1;
  const ping = t < 0.5 ? t * 2 : (1 - t) * 2;
  propPacket.position.lerpVectors(pf, pt, ping);
}

// Maneuver arrows
const manArrows = new Map<string, THREE.ArrowHelper>();

function addManeuverArrow(objId: string, dv: Vec3) {
  removeManeuverArrow(objId);
  const dir = new THREE.Vector3(...dv);
  if (dir.lengthSq() < 1e-12) return;
  dir.normalize();
  const arrow = new THREE.ArrowHelper(dir, new THREE.Vector3(), 0.18, COL.PROPOSAL, 0.05, 0.028);
  const sat = sats.get(objId);
  if (sat) { arrow.position.copy(sat.mesh.position); scene.add(arrow); manArrows.set(objId, arrow); }
}

function removeManeuverArrow(id: string) {
  const a = manArrows.get(id);
  if (a) { scene.remove(a); manArrows.delete(id); }
}

function clearAllArrows() { manArrows.forEach((_, id) => removeManeuverArrow(id)); }

// "Resolved" celebratory labels per satellite
const resolvedLabels = new Map<string, CSS2DObject>();

function showResolvedLabels() {
  sats.forEach((sat, id) => {
    if (isDebris(id)) return;
    if (resolvedLabels.has(id)) return;
    const div = document.createElement('div');
    div.className = 'resolved-label';
    div.textContent = '✓';
    const obj = new CSS2DObject(div);
    obj.position.set(0, 0.03, 0);
    sat.mesh.add(obj);
    resolvedLabels.set(id, obj);
  });
}

function clearResolvedLabels() {
  resolvedLabels.forEach((obj, id) => {
    const sat = sats.get(id);
    if (sat) sat.mesh.remove(obj);
  });
  resolvedLabels.clear();
}

// ── Position interpolation ────────────────────────────────────────────────────
function interpolatePos(frames: Frame[], id: string, t: number): THREE.Vector3 | null {
  if (!frames.length) return null;
  if (t <= frames[0].t) {
    const o = frames[0].objects.find(x => x.id === id);
    return o ? new THREE.Vector3(...o.r).multiplyScalar(S) : null;
  }
  const last = frames[frames.length - 1];
  if (t >= last.t) {
    const o = last.objects.find(x => x.id === id);
    return o ? new THREE.Vector3(...o.r).multiplyScalar(S) : null;
  }
  // Binary search
  let lo = 0, hi = frames.length - 1;
  while (lo < hi - 1) { const m = (lo + hi) >> 1; if (frames[m].t <= t) lo = m; else hi = m; }
  const f0 = frames[lo], f1 = frames[hi];
  const alpha = (t - f0.t) / (f1.t - f0.t);
  const o0 = f0.objects.find(x => x.id === id);
  const o1 = f1.objects.find(x => x.id === id);
  if (!o0 || !o1) return null;
  return new THREE.Vector3(...o0.r).lerp(new THREE.Vector3(...o1.r), alpha).multiplyScalar(S);
}

// ── Event processing ──────────────────────────────────────────────────────────
function processForwardEvents(evts: TLEvent[], fromT: number, toT: number) {
  const fired = evts.filter(e => e.t > fromT && e.t <= toT);
  for (const ev of fired) {
    const d = ev.data;
    switch (ev.type) {
      case 'conjunction_detected': {
        const aId = d['a_id'] as string, bId = d['b_id'] as string;
        const miss = d['miss_distance_km'] as number;
        activeConjs = [...activeConjs.filter(c => ck(c.aId, c.bId) !== ck(aId, bId)),
                       { aId, bId, miss }];
        upsertConjLine(aId, bId);
        log(ev.t, `CONJUNCTION  ${aId} / ${bId}  —  miss ${miss.toFixed(1)} km`, 'danger');
        break;
      }
      case 'new_conjunction': {
        const aId = d['a_id'] as string, bId = d['b_id'] as string;
        const miss = d['miss_distance_km'] as number;
        activeConjs = [...activeConjs.filter(c => ck(c.aId, c.bId) !== ck(aId, bId)),
                       { aId, bId, miss }];
        upsertConjLine(aId, bId);
        log(ev.t, `NEW CONJUNCTION  ${aId} / ${bId}  —  miss ${miss.toFixed(1)} km`, 'danger');
        break;
      }
      case 'proposal': {
        const fromId = d['proposer_id'] as string;
        const dv = d['est_dv_cost'] as number;
        // find the other party from active conj involving fromId
        const conj = activeConjs.find(c => c.aId === fromId || c.bId === fromId);
        const toId  = conj ? (conj.aId === fromId ? conj.bId : conj.aId) : '';
        if (toId) startProposal(fromId, toId);
        log(ev.t, `PROPOSAL  ${fromId} → negotiate  (Δv ${dv.toFixed(3)} km/s)`, 'proposal');
        break;
      }
      case 'maneuver_committed': {
        const objId = d['obj_id'] as string;
        const dv = d['dv_vector'] as Vec3;
        clearProposal();
        addManeuverArrow(objId, dv);
        log(ev.t, `BURN  ${objId}  —  Δv ${(d['est_dv_cost'] as number).toFixed(3)} km/s`, 'maneuver');
        break;
      }
      case 'resolved': {
        isResolved = true;
        activeConjs = [];
        clearAllConj();
        clearProposal();
        clearAllArrows();
        showResolvedLabels();
        log(ev.t, `ALL CLEAR  —  total Δv ${(d['total_dv_km_s'] as number).toFixed(3)} km/s`, 'safe');
        break;
      }
    }
  }
}

// Full rebuild when scrubbing backwards
function rebuildState(evts: TLEvent[], upToT: number) {
  activeConjs = [];
  isResolved = false;
  clearAllConj();
  clearProposal();
  clearAllArrows();
  clearResolvedLabels();

  const seen = evts.filter(e => e.t <= upToT);
  for (const ev of seen) {
    const d = ev.data;
    switch (ev.type) {
      case 'conjunction_detected':
      case 'new_conjunction': {
        const aId = d['a_id'] as string, bId = d['b_id'] as string;
        const miss = d['miss_distance_km'] as number;
        activeConjs = [...activeConjs.filter(c => ck(c.aId, c.bId) !== ck(aId, bId)),
                       { aId, bId, miss }];
        break;
      }
      case 'maneuver_committed': {
        // track most recent per object (show arrow in post-process below)
        break;
      }
      case 'resolved':
        isResolved = true;
        activeConjs = [];
        break;
    }
  }

  if (!isResolved) {
    activeConjs.forEach(c => upsertConjLine(c.aId, c.bId));
    // Show arrow for last committed maneuver per object
    const lastMan = new Map<string, Vec3>();
    seen.filter(e => e.type === 'maneuver_committed').forEach(e => {
      lastMan.set(e.data['obj_id'] as string, e.data['dv_vector'] as Vec3);
    });
    lastMan.forEach((dv, id) => addManeuverArrow(id, dv));
  } else {
    showResolvedLabels();
  }
}

// ── Object color ──────────────────────────────────────────────────────────────
function objectColor(id: string): number {
  if (isDebris(id)) return COL.DEBRIS;
  if (isResolved) return COL.SAFE;
  if (activeConjs.some(c => c.aId === id || c.bId === id)) return COL.DANGER;
  return COL.NORMAL;
}

// ── Trail update (preallocated buffer) ────────────────────────────────────────
function pushTrail(sat: SatObj, pos: THREE.Vector3) {
  sat.trailPts.push(pos.clone());
  if (sat.trailPts.length > TRAIL_MAX) sat.trailPts.shift();
  const n = sat.trailPts.length;
  for (let i = 0; i < n; i++) {
    const p = sat.trailPts[i];
    sat.trailBuf.setXYZ(i, p.x, p.y, p.z);
  }
  sat.trailBuf.needsUpdate = true;
  sat.trailLine.geometry.setDrawRange(0, n > 1 ? n : 0);
  sat.trailLine.geometry.computeBoundingSphere();
}

// ── Phase badge UI ────────────────────────────────────────────────────────────
function updatePhaseBadge() {
  if (isResolved) {
    phaseBadge.className = '';
    phaseText.textContent = 'ALL CLEAR — RESOLVED';
  } else if (activeConjs.length > 0) {
    phaseBadge.className = 'danger';
    phaseText.textContent = activeConjs.length > 1
      ? `${activeConjs.length} ACTIVE CONJUNCTIONS`
      : `CONJUNCTION — ${activeConjs[0].aId} / ${activeConjs[0].bId}`;
  } else {
    phaseBadge.className = '';
    phaseText.textContent = 'ALL CLEAR';
  }
}

// ── Log panel ─────────────────────────────────────────────────────────────────
function log(t: number, msg: string, cls: string) {
  const entry = document.createElement('div');
  entry.className = `log-entry ${cls}`;
  entry.textContent = `T+${t.toFixed(0).padStart(5)}s  ${msg}`;
  eventLog.appendChild(entry);
  eventLog.scrollTop = eventLog.scrollHeight;
}

// ── Playback state ────────────────────────────────────────────────────────────
let tl: Timeline | null = null;
let tMin = 0, tMax = 1;
let playTime = 0;
let playing  = false;
let speed    = 10;
let prevT    = 0;
let trailTick = 0;

function loadTimeline(data: Timeline) {
  tl       = data;
  tMin     = data.frames[0]?.t ?? 0;
  tMax     = data.frames.at(-1)?.t ?? 1;
  playTime = tMin;
  prevT    = tMin;
  playing  = false;
  isResolved = false;
  activeConjs = [];

  // Extract object IDs
  const metaObjs = data.meta['objects'];
  const ids: string[] = Array.isArray(metaObjs)
    ? (metaObjs as string[])
    : [...new Set(data.frames.flatMap(f => f.objects.map(o => o.id)))];

  initSats(ids);
  clearAllConj();
  clearProposal();
  clearAllArrows();
  clearResolvedLabels();

  eventLog.innerHTML = '';
  scrubber.value = '0';
  updatePlayBtn();
  updateTimeDsp();
  updatePhaseBadge();

  const scenario = (data.meta['scenario'] as string | undefined) ?? 'Unnamed scenario';
  subtitleEl.textContent = scenario;

  log(tMin, `Loaded — ${ids.length} objects, ${data.events.length} events`, 'info');
}

// ── Animation loop ────────────────────────────────────────────────────────────
let lastMs = performance.now();

function frame() {
  requestAnimationFrame(frame);

  const nowMs = performance.now();
  const dtMs  = nowMs - lastMs;
  lastMs = nowMs;

  if (tl) {
    if (playing) {
      prevT = playTime;
      playTime = Math.min(tMax, playTime + (dtMs / 1000) * speed);
      processForwardEvents(tl.events, prevT, playTime);
      if (playTime >= tMax) { playing = false; updatePlayBtn(); }
      scrubber.value = String(Math.round(((playTime - tMin) / (tMax - tMin)) * 1000));
    }

    // Update satellite positions
    trailTick++;
    const pushTrailNow = trailTick % 3 === 0;
    sats.forEach((sat, id) => {
      const pos = interpolatePos(tl!.frames, id, playTime);
      if (!pos) return;
      sat.mesh.position.copy(pos);
      if (pushTrailNow) pushTrail(sat, pos);

      // Arrow follows satellite
      const arrow = manArrows.get(id);
      if (arrow) arrow.position.copy(pos);
    });

    // Conjunction lines
    updateConjLinePositions();

    // Miss distance labels
    if (trailTick % 8 === 0) syncConjLabels();

    // Proposal animation
    updateProposal(nowMs);

    // Object colors + pulse
    const pulse = 0.45 + 0.55 * Math.sin(nowMs * 0.0065);
    sats.forEach((sat, id) => {
      const col = objectColor(id);
      const mat = sat.mesh.material as THREE.MeshPhongMaterial;
      const gMat = sat.glow.material as THREE.MeshBasicMaterial;
      mat.color.setHex(col);
      mat.emissive.setHex(col);

      const inDanger = !isResolved && activeConjs.some(c => c.aId === id || c.bId === id);
      mat.emissiveIntensity = inDanger ? 0.35 + pulse * 0.65 : 0.5;
      gMat.color.setHex(col);
      gMat.opacity = inDanger ? 0.08 + pulse * 0.25 : 0.1;

      // Trail color
      const tMat = sat.trailLine.material as THREE.LineBasicMaterial;
      tMat.color.setHex(inDanger ? 0x440000 : (isResolved ? 0x004422 : COL.TRAIL));
    });

    // Phase badge
    if (trailTick % 5 === 0) updatePhaseBadge();
    updateTimeDsp();
  }

  earth.rotation.y += 0.00008;
  controls.update();
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
}

// ── UI helpers ────────────────────────────────────────────────────────────────
function updatePlayBtn() { playBtn.textContent = playing ? '⏸' : '▶'; }

function updateTimeDsp() {
  const mins = Math.floor(playTime / 60);
  const secs = Math.floor(playTime % 60);
  timeDsp.textContent = `T+${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
}

// ── UI event wiring ───────────────────────────────────────────────────────────
playBtn.addEventListener('click', () => {
  if (!tl) return;
  if (!playing && playTime >= tMax) {
    playTime = tMin; prevT = tMin;
    rebuildState(tl.events, tMin);
    scrubber.value = '0';
  }
  playing = !playing;
  updatePlayBtn();
});

scrubber.addEventListener('input', () => {
  if (!tl) return;
  const frac = parseFloat(scrubber.value) / 1000;
  const newT = tMin + frac * (tMax - tMin);
  const wasPlaying = playing;
  playing = false;

  if (newT < playTime) {
    rebuildState(tl.events, newT);
  } else {
    processForwardEvents(tl.events, playTime, newT);
  }
  prevT = playTime;
  playTime = newT;

  // Update satellite positions immediately for scrub preview
  sats.forEach((sat, id) => {
    const pos = interpolatePos(tl!.frames, id, playTime);
    if (pos) { sat.mesh.position.copy(pos); sat.trailPts = []; sat.trailLine.geometry.setDrawRange(0, 0); }
  });
  updatePhaseBadge();
  updateTimeDsp();
  if (wasPlaying) { playing = true; updatePlayBtn(); }
});

speedSel.addEventListener('change', () => { speed = parseFloat(speedSel.value); });

window.addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  labelRenderer.setSize(innerWidth, innerHeight);
});

// ── File drop ─────────────────────────────────────────────────────────────────
window.addEventListener('dragover', e => e.preventDefault());
window.addEventListener('drop', e => {
  e.preventDefault();
  const file = e.dataTransfer?.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    try { loadTimeline(JSON.parse(ev.target!.result as string) as Timeline); }
    catch { alert('Invalid Timeline JSON — check the console.'); }
  };
  reader.readAsText(file);
});

// ── Boot ──────────────────────────────────────────────────────────────────────
fetch('./sample_timeline.json')
  .then(r => r.json())
  .then((data: Timeline) => loadTimeline(data))
  .catch(err => {
    subtitleEl.textContent = 'Drop a timeline JSON to begin';
    console.warn('sample_timeline.json not loaded:', err);
  });

frame();
