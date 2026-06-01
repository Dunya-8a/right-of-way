import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { LiveSatLayer } from './live-sats.js';

// ── Timeline contract (mirrors web/types.ts) ─────────────────────────────────
type Vec3 = [number, number, number];
interface FrameObject { id: string; r: Vec3; }
interface Frame { t: number; objects: FrameObject[]; }
interface TLEvent { t: number; type: string; data: Record<string, unknown>; }
interface Timeline { meta: Record<string, unknown>; frames: Frame[]; events: TLEvent[]; }

// ── Scene constants ───────────────────────────────────────────────────────────
const EARTH_KM = 6371;
const ORBIT_KM = 6878;
const S = 1 / ORBIT_KM;         // km → scene units; LEO ≈ 1 unit radius
const EARTH_R = EARTH_KM * S;   // ~0.926

const COL = {
  BG:       0x050510,
  NORMAL:   0x00d4ff,
  DANGER:   0xff2020,
  SAFE:     0x00ff88,
  PROPOSAL: 0xffaa00,
  DEBRIS:   0x888888,
  TRAIL:    0x003355,
  RING:     0x00284a,
};

const TRAIL_MAX = 40;

// ── Earth texture loading ─────────────────────────────────────────────────────

// Fallback canvas texture (used while real texture loads or if fetch fails)
function makeProceduralEarth(): THREE.CanvasTexture {
  const W = 512, H = 256;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d')!;
  const ocean = ctx.createLinearGradient(0, 0, 0, H);
  ocean.addColorStop(0, '#0b2240'); ocean.addColorStop(0.5, '#0d2d55'); ocean.addColorStop(1, '#0b2240');
  ctx.fillStyle = ocean; ctx.fillRect(0, 0, W, H);
  function blob(cx: number, cy: number, rx: number, ry: number) {
    ctx.beginPath(); ctx.ellipse(cx*W, cy*H, rx*W, ry*H, 0, 0, Math.PI*2); ctx.fill();
  }
  ctx.fillStyle = '#1e4020';
  blob(0.14,0.28,0.10,0.22); blob(0.18,0.60,0.07,0.20);
  blob(0.47,0.20,0.05,0.14); blob(0.48,0.52,0.07,0.24); blob(0.50,0.30,0.04,0.10);
  blob(0.63,0.44,0.03,0.10); blob(0.69,0.22,0.20,0.26); blob(0.82,0.63,0.06,0.09);
  ctx.fillStyle = '#c8daea'; blob(0.28,0.12,0.04,0.08);
  ctx.fillStyle = '#d8e8f8'; ctx.fillRect(0,0,W,0.08*H); ctx.fillRect(0,0.88*H,W,0.12*H);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Option A: load static Blue Marble texture (with canvas fallback)
function loadStaticEarth(mat: THREE.MeshPhongMaterial) {
  const loader = new THREE.TextureLoader();
  loader.load(
    '/earth.jpg',
    tex => {
      tex.colorSpace = THREE.SRGBColorSpace;
      mat.map = tex;
      mat.needsUpdate = true;
      setEarthStatusLabel('');
    },
    undefined,
    () => { /* fallback canvas already applied */ },
  );
  loader.load(
    '/earth_specular.jpg',
    tex => { mat.specularMap = tex; mat.needsUpdate = true; },
  );
}

// Option B: assemble today's Earth from NASA GIBS WMTS tiles
// TileMatrixSet=250m, TileMatrix=2 → 5 cols × 3 rows, 512px tiles → 2560×1536
// Layers composited (lighten blend) for near-complete daily global coverage:
//   1. VIIRS NOAA-20  (3040km swath, ~99% daily coverage)
//   2. MODIS Aqua     (fills remaining gaps with 2330km swath, different orbit)
const GIBS_BASE   = 'https://gibs.earthdata.nasa.gov/wmts/epsg4326/best';
const GIBS_MATRIX = '250m';
const GIBS_ZOOM   = 2;    // TileMatrix=2: 5 cols × 3 rows
const GIBS_COLS   = 5;
const GIBS_ROWS   = 3;
const GIBS_TILE   = 512;

const GIBS_LAYER_VIIRS = 'VIIRS_NOAA20_CorrectedReflectance_TrueColor';

async function fetchLiveEarth(mat: THREE.MeshPhongMaterial): Promise<void> {
  const now = new Date();
  now.setDate(now.getDate() - 1);
  const dateStr = now.toISOString().slice(0, 10);
  setEarthStatusLabel(`LIVE  ${dateStr}…`);

  const W = GIBS_COLS * GIBS_TILE, H = GIBS_ROWS * GIBS_TILE;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  // Step 1: draw Blue Marble as base so ocean + southern hemisphere look correct
  //         while tiles load, and as permanent fallback for gap areas
  ctx.fillStyle = '#0d2545'; ctx.fillRect(0, 0, W, H);
  await new Promise<void>(resolve => {
    const img = new Image();
    img.onload = () => { ctx.drawImage(img, 0, 0, W, H); resolve(); };
    img.onerror = () => resolve();
    img.src = '/earth.jpg';
  });

  // Show Blue Marble immediately
  const partialTex = new THREE.CanvasTexture(canvas);
  partialTex.colorSpace = THREE.SRGBColorSpace;
  mat.map = partialTex; mat.specularMap = null; mat.needsUpdate = true;

  // Step 2: overlay VIIRS NOAA-20 tiles with 'lighten' blend:
  //   bright pixels (clouds, lit land) win over Blue Marble
  //   dark pixels (no-data, night ocean) → Blue Marble shows through
  ctx.globalCompositeOperation = 'lighten';
  const fetches: Promise<void>[] = [];
  for (let row = 0; row < GIBS_ROWS; row++) {
    for (let col = 0; col < GIBS_COLS; col++) {
      const url = `${GIBS_BASE}/${GIBS_LAYER_VIIRS}/default/${dateStr}/${GIBS_MATRIX}/${GIBS_ZOOM}/${row}/${col}.jpeg`;
      fetches.push(
        fetch(url)
          .then(r => { if (!r.ok) throw new Error(r.status.toString()); return r.blob(); })
          .then(blob => new Promise<void>(resolve => {
            const img = new Image();
            img.onload = () => {
              // Amplify cloud signal: pull sparse bright pixels (clouds) to white,
              // collapse dark no-data pixels to black → Blue Marble wins via lighten
              ctx.filter = 'brightness(3) contrast(2)';
              ctx.drawImage(img, col * GIBS_TILE, row * GIBS_TILE, GIBS_TILE, GIBS_TILE);
              ctx.filter = 'none';
              partialTex.needsUpdate = true;
              resolve();
            };
            img.onerror = () => resolve();
            img.src = URL.createObjectURL(blob);
          }))
          .catch(() => { /* skip failed tile — Blue Marble already underneath */ }),
      );
    }
  }
  await Promise.all(fetches);
  ctx.globalCompositeOperation = 'source-over';

  partialTex.needsUpdate = true;
  setEarthStatusLabel(`LIVE  ${dateStr}  ✓`);
}

// Status label shown next to the live button
function setEarthStatusLabel(msg: string) {
  const el = document.getElementById('earth-status');
  if (el) el.textContent = msg;
}

// ── DOM refs ─────────────────────────────────────────────────────────────────
const canvasEl    = document.getElementById('canvas')     as HTMLCanvasElement;
const labelRoot   = document.getElementById('label-root')!;
const playBtn     = document.getElementById('play-btn')!;
const scrubber    = document.getElementById('scrubber')   as HTMLInputElement;
const timeDsp     = document.getElementById('time-display')!;
const speedSel    = document.getElementById('speed-select') as HTMLSelectElement;
const phaseBadge  = document.getElementById('phase-badge')!;
const phaseText   = document.getElementById('phase-text')!;
const eventLog    = document.getElementById('event-log')!;
const subtitleEl  = document.getElementById('subtitle')!;
const eventMarks  = document.getElementById('event-marks')!;

// ── Renderer + scene ──────────────────────────────────────────────────────────
const renderer = new THREE.WebGLRenderer({ canvas: canvasEl, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.setClearColor(COL.BG);

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(innerWidth, innerHeight);
labelRenderer.domElement.style.cssText = 'position:absolute;top:0;left:0;pointer-events:none;';
labelRoot.appendChild(labelRenderer.domElement);

const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.005, 200);
camera.position.set(0, 0.7, 3.2);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 1.15;
controls.maxDistance = 20;

// Lights
scene.add(new THREE.AmbientLight(0x334466, 0.7));
const sun = new THREE.DirectionalLight(0xfff5ee, 1.3);
sun.position.set(8, 5, 6);
scene.add(sun);
// Rim light from back
const rim = new THREE.DirectionalLight(0x0044aa, 0.35);
rim.position.set(-5, -2, -4);
scene.add(rim);

// Stars
{
  const verts: number[] = [];
  for (let i = 0; i < 3000; i++) {
    const r = 70 + Math.random() * 60;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    verts.push(r * Math.sin(ph) * Math.cos(th), r * Math.sin(ph) * Math.sin(th), r * Math.cos(ph));
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  scene.add(new THREE.Points(g, new THREE.PointsMaterial({ color: 0xffffff, size: 0.05, sizeAttenuation: false })));
}

// Earth — start with procedural texture, async-replace with real texture
const earthMat = new THREE.MeshPhongMaterial({
  map: makeProceduralEarth(),
  specular: new THREE.Color(0x224466),
  shininess: 20,
  emissive: new THREE.Color(0x050d1a),
  emissiveIntensity: 0.2,
});
const earth = new THREE.Mesh(new THREE.SphereGeometry(EARTH_R, 64, 32), earthMat);
loadStaticEarth(earthMat);  // Option A kicks off immediately
scene.add(earth);

// City lights (faint emissive sphere, only on night side)
const nightTex = (() => {
  const W = 512, H = 256;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#ffffaa';
  // Scatter of city dots on major urban regions
  const cities = [
    [0.10,0.25],[0.13,0.27],[0.15,0.30],[0.23,0.24], // N America
    [0.47,0.19],[0.49,0.20],[0.50,0.22],[0.48,0.23], // Europe
    [0.61,0.27],[0.65,0.25],[0.70,0.28],[0.72,0.30], // Asia
    [0.63,0.32],[0.74,0.38],[0.90,0.30],              // more Asia
  ];
  cities.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x * W, y * H, 2, 0, Math.PI * 2);
    ctx.fill();
  });
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
})();
scene.add(new THREE.Mesh(
  new THREE.SphereGeometry(EARTH_R * 1.001, 64, 32),
  new THREE.MeshBasicMaterial({ map: nightTex, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending }),
));

// Atmosphere outer glow
scene.add(new THREE.Mesh(
  new THREE.SphereGeometry(EARTH_R * 1.06, 48, 24),
  new THREE.MeshPhongMaterial({ color: 0x0d3a6e, transparent: true, opacity: 0.10, side: THREE.BackSide }),
));

// ── Orbit ring helper ─────────────────────────────────────────────────────────
function makeOrbitRing(id: string, frames: Frame[]): THREE.Line | null {
  // Need two non-collinear position vectors to define the orbital plane
  let v0: THREE.Vector3 | null = null, v1: THREE.Vector3 | null = null;
  for (let i = 0; i < frames.length - 1; i++) {
    const o0 = frames[i].objects.find(o => o.id === id);
    const o1 = frames[i + 1].objects.find(o => o.id === id);
    if (!o0 || !o1) continue;
    const a = new THREE.Vector3(...o0.r);
    const b = new THREE.Vector3(...o1.r);
    if (a.lengthSq() < 100 || b.lengthSq() < 100) continue;
    if (new THREE.Vector3().crossVectors(a, b).lengthSq() > 1000) {
      v0 = a.multiplyScalar(S);
      v1 = b.multiplyScalar(S);
      break;
    }
  }
  if (!v0 || !v1) return null;

  const normal = new THREE.Vector3().crossVectors(v0, v1).normalize();
  const radius = v0.length();

  const N = 160;
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= N; i++) {
    const theta = (i / N) * Math.PI * 2;
    pts.push(new THREE.Vector3(radius * Math.cos(theta), radius * Math.sin(theta), 0));
  }

  const geom = new THREE.BufferGeometry().setFromPoints(pts);
  const mat  = new THREE.LineBasicMaterial({ color: COL.RING, transparent: true, opacity: 0.4 });
  const ring = new THREE.Line(geom, mat);

  // Rotate the circle from the XY plane to the satellite's orbital plane
  const zAxis = new THREE.Vector3(0, 0, 1);
  if (Math.abs(normal.dot(zAxis)) < 0.9999) {
    ring.setRotationFromQuaternion(
      new THREE.Quaternion().setFromUnitVectors(zAxis, normal),
    );
  }
  return ring;
}

// ── Satellite objects ─────────────────────────────────────────────────────────
interface SatObj {
  mesh:      THREE.Mesh;
  glow:      THREE.Mesh;
  trailLine: THREE.Line;
  trailBuf:  THREE.BufferAttribute;
  trailPts:  THREE.Vector3[];
  nameLabel: CSS2DObject;
  orbitRing: THREE.Line | null;
}

const sats = new Map<string, SatObj>();

function isDebris(id: string) { return id.toLowerCase().includes('debris'); }

function makeSat(id: string, frames: Frame[]): SatObj {
  const baseColor = isDebris(id) ? COL.DEBRIS : COL.NORMAL;
  const r = isDebris(id) ? 0.009 : 0.015;

  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(r, 16, 10),
    new THREE.MeshPhongMaterial({ color: baseColor, emissive: baseColor, emissiveIntensity: 0.6 }),
  );

  const glow = new THREE.Mesh(
    new THREE.SphereGeometry(r * 2.8, 10, 6),
    new THREE.MeshBasicMaterial({ color: baseColor, transparent: true, opacity: 0.14 }),
  );
  mesh.add(glow);

  const div = document.createElement('div');
  div.className = 'sat-label';
  div.textContent = id;
  const nameLabel = new CSS2DObject(div);
  nameLabel.position.set(0, r * 3.8, 0);
  mesh.add(nameLabel);

  const buf = new THREE.Float32BufferAttribute(new Float32Array(TRAIL_MAX * 3), 3);
  const trailGeom = new THREE.BufferGeometry();
  trailGeom.setAttribute('position', buf);
  trailGeom.setDrawRange(0, 0);
  const trailLine = new THREE.Line(
    trailGeom,
    new THREE.LineBasicMaterial({ color: COL.TRAIL, transparent: true, opacity: 0.5 }),
  );

  const orbitRing = makeOrbitRing(id, frames);

  scene.add(mesh);
  scene.add(trailLine);
  if (orbitRing) scene.add(orbitRing);

  return { mesh, glow, trailLine, trailBuf: buf, trailPts: [], nameLabel, orbitRing };
}

function clearSats() {
  sats.forEach(s => {
    scene.remove(s.mesh);
    scene.remove(s.trailLine);
    if (s.orbitRing) scene.remove(s.orbitRing);
  });
  sats.clear();
}

function initSats(ids: string[], frames: Frame[]) {
  clearSats();
  ids.forEach(id => sats.set(id, makeSat(id, frames)));
}

// ── Conjunction / proposal overlays ──────────────────────────────────────────
interface ConjState { aId: string; bId: string; miss: number; }

let activeConjs: ConjState[] = [];
let isResolved  = false;

const conjLines  = new Map<string, THREE.Line>();
const conjMidPts = new Map<string, CSS2DObject>();

function ck(a: string, b: string) { return [a, b].sort().join(':'); }

function upsertConjLine(a: string, b: string) {
  const key = ck(a, b);
  if (conjLines.has(key)) return;
  const g = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
  conjLines.set(key, new THREE.Line(g, new THREE.LineBasicMaterial({ color: COL.DANGER })));
  scene.add(conjLines.get(key)!);
}

function removeConjLine(key: string) {
  const line = conjLines.get(key);
  if (line) { scene.remove(line); line.geometry.dispose(); conjLines.delete(key); }
  const mid = conjMidPts.get(key);
  if (mid) { scene.remove(mid); conjMidPts.delete(key); }
}

function clearAllConj() { [...conjLines.keys()].forEach(k => removeConjLine(k)); }

function updateConjLinePositions() {
  conjLines.forEach((line, key) => {
    const [aId, bId] = key.split(':');
    const sa = sats.get(aId), sb = sats.get(bId);
    if (!sa || !sb) return;
    const pos = line.geometry.attributes.position as THREE.BufferAttribute;
    pos.setXYZ(0, sa.mesh.position.x, sa.mesh.position.y, sa.mesh.position.z);
    pos.setXYZ(1, sb.mesh.position.x, sb.mesh.position.y, sb.mesh.position.z);
    pos.needsUpdate = true;
    line.geometry.computeBoundingSphere();
  });
}

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
let propLine:   THREE.Line | null = null;
let propPacket: THREE.Mesh | null = null;
let propFrom:   string | null = null;
let propTo:     string | null = null;
let propWall0 = 0;

function startProposal(fromId: string, toId: string) {
  clearProposal();
  const g = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
  propLine = new THREE.Line(g, new THREE.LineBasicMaterial({ color: COL.PROPOSAL, transparent: true, opacity: 0.75 }));
  scene.add(propLine);
  propPacket = new THREE.Mesh(
    new THREE.SphereGeometry(0.018, 8, 6),
    new THREE.MeshBasicMaterial({ color: COL.PROPOSAL }),
  );
  scene.add(propPacket);
  propFrom = fromId; propTo = toId; propWall0 = performance.now();
}

function clearProposal() {
  if (propLine)   { scene.remove(propLine);   propLine   = null; }
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
  const arrow = new THREE.ArrowHelper(dir, new THREE.Vector3(), 0.22, COL.PROPOSAL, 0.06, 0.032);
  const sat = sats.get(objId);
  if (sat) { arrow.position.copy(sat.mesh.position); scene.add(arrow); manArrows.set(objId, arrow); }
}

function removeManeuverArrow(id: string) {
  const a = manArrows.get(id);
  if (a) { scene.remove(a); manArrows.delete(id); }
}

function clearAllArrows() { manArrows.forEach((_, id) => removeManeuverArrow(id)); }

// Resolved check marks
const resolvedLabels = new Map<string, CSS2DObject>();

function showResolvedLabels() {
  sats.forEach((sat, id) => {
    if (isDebris(id) || resolvedLabels.has(id)) return;
    const div = document.createElement('div');
    div.className = 'resolved-label';
    div.textContent = '✓';
    const obj = new CSS2DObject(div);
    obj.position.set(0, 0.035, 0);
    sat.mesh.add(obj);
    resolvedLabels.set(id, obj);
  });
}

function clearResolvedLabels() {
  resolvedLabels.forEach((obj, id) => { sats.get(id)?.mesh.remove(obj); });
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
  let lo = 0, hi = frames.length - 1;
  while (lo < hi - 1) { const m = (lo + hi) >> 1; if (frames[m].t <= t) lo = m; else hi = m; }
  const f0 = frames[lo], f1 = frames[hi];
  const alpha = (t - f0.t) / (f1.t - f0.t);
  const o0 = frames[lo].objects.find(x => x.id === id);
  const o1 = frames[hi].objects.find(x => x.id === id);
  if (!o0 || !o1) return null;
  return new THREE.Vector3(...o0.r).lerp(new THREE.Vector3(...o1.r), alpha).multiplyScalar(S);
}

// ── Event processing ──────────────────────────────────────────────────────────
function processForwardEvents(evts: TLEvent[], fromT: number, toT: number) {
  for (const ev of evts) {
    if (ev.t <= fromT || ev.t > toT) continue;
    const d = ev.data;
    switch (ev.type) {
      case 'conjunction_detected':
      case 'new_conjunction': {
        const aId = d['a_id'] as string, bId = d['b_id'] as string;
        const miss = d['miss_distance_km'] as number;
        activeConjs = [...activeConjs.filter(c => ck(c.aId, c.bId) !== ck(aId, bId)), { aId, bId, miss }];
        upsertConjLine(aId, bId);
        const prefix = ev.type === 'new_conjunction' ? 'NEW CONJUNCTION' : 'CONJUNCTION';
        log(ev.t, `${prefix}  ${aId} / ${bId}  —  miss ${miss.toFixed(1)} km`, 'danger');
        break;
      }
      case 'proposal': {
        const fromId = d['proposer_id'] as string;
        const recipientId = d['recipient_id'] as string | undefined;
        const conj = activeConjs.find(c => c.aId === fromId || c.bId === fromId);
        const toId = recipientId
          ?? (conj ? (conj.aId === fromId ? conj.bId : conj.aId) : '');
        if (toId) startProposal(fromId, toId);
        log(ev.t, `PROPOSAL  ${fromId} → negotiate  (Δv ${(d['est_dv_cost'] as number).toFixed(3)} km/s)`, 'proposal');
        break;
      }
      case 'maneuver_committed': {
        const objId = d['obj_id'] as string;
        clearProposal();
        addManeuverArrow(objId, d['dv_vector'] as Vec3);
        log(ev.t, `BURN  ${objId}  —  Δv ${(d['est_dv_cost'] as number).toFixed(3)} km/s`, 'maneuver');
        break;
      }
      case 'resolved': {
        isResolved = true;
        activeConjs = [];
        clearAllConj(); clearProposal(); clearAllArrows();
        showResolvedLabels();
        log(ev.t, `ALL CLEAR  —  total Δv ${(d['total_dv_km_s'] as number).toFixed(3)} km/s`, 'safe');
        break;
      }
    }
  }
}

// Full rebuild when scrubbing backwards
function rebuildState(evts: TLEvent[], upToT: number) {
  activeConjs = []; isResolved = false;
  clearAllConj(); clearProposal(); clearAllArrows(); clearResolvedLabels();

  for (const ev of evts) {
    if (ev.t > upToT) break;
    const d = ev.data;
    if (ev.type === 'conjunction_detected' || ev.type === 'new_conjunction') {
      const aId = d['a_id'] as string, bId = d['b_id'] as string, miss = d['miss_distance_km'] as number;
      activeConjs = [...activeConjs.filter(c => ck(c.aId, c.bId) !== ck(aId, bId)), { aId, bId, miss }];
    } else if (ev.type === 'resolved') {
      isResolved = true; activeConjs = [];
    }
  }
  if (!isResolved) {
    activeConjs.forEach(c => upsertConjLine(c.aId, c.bId));
    const lastMan = new Map<string, Vec3>();
    evts.filter(e => e.t <= upToT && e.type === 'maneuver_committed')
        .forEach(e => lastMan.set(e.data['obj_id'] as string, e.data['dv_vector'] as Vec3));
    lastMan.forEach((dv, id) => addManeuverArrow(id, dv));
  } else {
    showResolvedLabels();
  }
}

// ── Satellite color ───────────────────────────────────────────────────────────
function objectColor(id: string): number {
  if (isDebris(id)) return COL.DEBRIS;
  if (isResolved) return COL.SAFE;
  if (activeConjs.some(c => c.aId === id || c.bId === id)) return COL.DANGER;
  return COL.NORMAL;
}

// ── Trail push ────────────────────────────────────────────────────────────────
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

// ── Phase badge ───────────────────────────────────────────────────────────────
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

// ── Event log ─────────────────────────────────────────────────────────────────
function log(t: number, msg: string, cls: string) {
  const entry = document.createElement('div');
  entry.className = `log-entry ${cls}`;
  entry.textContent = `T+${String(Math.round(t)).padStart(5)}s  ${msg}`;
  eventLog.appendChild(entry);
  eventLog.scrollTop = eventLog.scrollHeight;
}

// ── Event markers on scrubber ─────────────────────────────────────────────────
const EVT_MARK_CLASS: Record<string, string> = {
  conjunction_detected: 'danger',
  new_conjunction:      'danger',
  proposal:             'proposal',
  maneuver_committed:   'maneuver',
  resolved:             'safe',
};

function updateEventMarkers(evts: TLEvent[], tMin: number, tMax: number) {
  eventMarks.innerHTML = '';
  const range = tMax - tMin;
  if (range <= 0) return;
  evts.forEach(ev => {
    const frac = (ev.t - tMin) / range;
    const mark = document.createElement('div');
    mark.className = `ev-mark ${EVT_MARK_CLASS[ev.type] ?? 'info'}`;
    // Account for thumb half-width (~7px) so mark aligns with thumb position
    mark.style.left = `calc(7px + ${(frac * 100).toFixed(3)}% - ${(frac * 14).toFixed(3)}px)`;
    mark.title = `T+${ev.t}s: ${ev.type}`;
    eventMarks.appendChild(mark);
  });
}

// ── Playback state ────────────────────────────────────────────────────────────
let tl: Timeline | null = null;
let tMin = 0, tMax = 1;
let playTime = 0;
let playing  = false;
let speed    = 10;
let trailTick = 0;

function loadTimeline(data: Timeline) {
  tl = data;
  tMin = data.frames[0]?.t ?? 0;
  tMax = data.frames.at(-1)?.t ?? 1;
  playTime = tMin;
  playing  = false;
  isResolved = false;
  activeConjs = [];

  const metaObjs = data.meta['objects'];
  const ids: string[] = Array.isArray(metaObjs)
    ? (metaObjs as string[])
    : [...new Set(data.frames.flatMap(f => f.objects.map(o => o.id)))];

  initSats(ids, data.frames);
  clearAllConj(); clearProposal(); clearAllArrows(); clearResolvedLabels();

  eventLog.innerHTML = '';
  scrubber.value = '0';
  updatePlayBtn();
  updateTimeDsp();
  updatePhaseBadge();
  updateEventMarkers(data.events, tMin, tMax);

  subtitleEl.textContent = (data.meta['scenario'] as string | undefined) ?? 'Unnamed scenario';
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
      const prev = playTime;
      playTime = Math.min(tMax, playTime + (dtMs / 1000) * speed);
      processForwardEvents(tl.events, prev, playTime);
      if (playTime >= tMax) { playing = false; updatePlayBtn(); }
      scrubber.value = String(Math.round(((playTime - tMin) / (tMax - tMin)) * 1000));
    }

    trailTick++;
    sats.forEach((sat, id) => {
      const pos = interpolatePos(tl!.frames, id, playTime);
      if (!pos) return;
      sat.mesh.position.copy(pos);
      if (trailTick % 3 === 0) pushTrail(sat, pos);
      manArrows.get(id)?.position.copy(pos);
    });

    updateConjLinePositions();
    if (trailTick % 8 === 0) syncConjLabels();
    updateProposal(nowMs);

    // Color + pulse
    const pulse = 0.45 + 0.55 * Math.sin(nowMs * 0.007);
    sats.forEach((sat, id) => {
      const col = objectColor(id);
      const mat  = sat.mesh.material as THREE.MeshPhongMaterial;
      const gMat = sat.glow.material as THREE.MeshBasicMaterial;
      mat.color.setHex(col); mat.emissive.setHex(col);
      const danger = !isResolved && activeConjs.some(c => c.aId === id || c.bId === id);
      mat.emissiveIntensity = danger ? 0.35 + pulse * 0.65 : 0.55;
      gMat.color.setHex(col); gMat.opacity = danger ? 0.08 + pulse * 0.28 : 0.12;

      const tMat = sat.trailLine.material as THREE.LineBasicMaterial;
      tMat.color.setHex(danger ? 0x440000 : isResolved ? 0x004422 : COL.TRAIL);

      // Orbit ring: brighten when in danger, dim otherwise
      if (sat.orbitRing) {
        const rMat = sat.orbitRing.material as THREE.LineBasicMaterial;
        rMat.color.setHex(danger ? 0x441100 : isResolved ? 0x004422 : COL.RING);
        rMat.opacity = danger ? 0.55 + pulse * 0.20 : 0.38;
      }
    });

    if (trailTick % 5 === 0) updatePhaseBadge();
    updateTimeDsp();
  }

  earth.rotation.y += 0.00008;
  liveLayer.tick60(new Date());
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

// ── UI wiring ─────────────────────────────────────────────────────────────────
playBtn.addEventListener('click', () => {
  if (!tl) return;
  if (!playing && playTime >= tMax) {
    playTime = tMin;
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
  playTime = newT;

  sats.forEach((sat, id) => {
    const pos = interpolatePos(tl!.frames, id, playTime);
    if (pos) { sat.mesh.position.copy(pos); sat.trailPts = []; sat.trailLine.geometry.setDrawRange(0, 0); }
  });
  updatePhaseBadge(); updateTimeDsp();
  if (wasPlaying) { playing = true; updatePlayBtn(); }
});

speedSel.addEventListener('change', () => { speed = parseFloat(speedSel.value); });

document.getElementById('live-btn')?.addEventListener('click', () => {
  fetchLiveEarth(earthMat).catch(console.warn);
});

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

// ── Live satellite layer ──────────────────────────────────────────────────────
const liveLayer = new LiveSatLayer(scene);

function updateSatGroupBtn(btn: HTMLElement) {
  const groupId = btn.dataset['group']!;
  const active = liveLayer.isVisible(groupId);
  const n = liveLayer.count(groupId);
  btn.classList.toggle('active', active);
  const countEl = btn.querySelector('.btn-count') as HTMLElement;
  if (countEl) countEl.textContent = n > 0 ? `(${n})` : '';
}

document.querySelectorAll<HTMLElement>('.sat-group-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const groupId = btn.dataset['group']!;
    if (!liveLayer.isLoaded(groupId)) {
      btn.classList.add('loading');
      btn.querySelector<HTMLElement>('.btn-count')!.textContent = '…';
      try {
        await liveLayer.loadGroup(groupId);
        liveLayer.setVisible(groupId, true);
      } catch (err) {
        const msg = String(err).includes('rate-limit') ? '2h' : 'ERR';
        console.warn('CelesTrak fetch failed:', err);
        btn.querySelector<HTMLElement>('.btn-count')!.textContent = msg;
      } finally {
        btn.classList.remove('loading');
      }
    } else {
      liveLayer.setVisible(groupId, !liveLayer.isVisible(groupId));
    }
    updateSatGroupBtn(btn);
  });
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
