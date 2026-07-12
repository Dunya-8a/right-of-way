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
  bubbleBatch = 0;
  for (const ev of evts) {
    if (ev.t <= fromT || ev.t > toT) continue;
    applyOneEvent(ev);
  }
}

function applyOneEvent(ev: TLEvent) {
  {
    const d = ev.data;
    switch (ev.type) {
      case 'conjunction_detected':
      case 'new_conjunction': {
        const aId = d['a_id'] as string, bId = d['b_id'] as string;
        const miss = d['miss_distance_km'] as number;
        activeConjs = [...activeConjs.filter(c => ck(c.aId, c.bId) !== ck(aId, bId)), { aId, bId, miss }];
        upsertConjLine(aId, bId);
        episodeBubbles.clear(); // a new conjunction opens a new negotiation episode
        const prefix = ev.type === 'new_conjunction'
          ? '⚖ RE-SCREEN ✗  NEW CONJUNCTION'
          : 'CONJUNCTION';
        log(ev.t, `${prefix}  ${aId} / ${bId}  —  miss ${miss.toFixed(1)} km`, 'danger');
        if (ev.type === 'new_conjunction') {
          enqueueCaption(
            'THE DODGE CREATED A NEW NEAR-MISS',
            `${aId} / ${bId} — ${miss.toFixed(1)} km. Back to the negotiating table.`,
            '#ff4d5e',
          );
        } else {
          const tca = d['tca'] as number | undefined;
          const eta = tca ? ` — closest approach in ${Math.round((tca - ev.t) / 60)} min` : '';
          enqueueCaption('COLLISION COURSE', `${aId} / ${bId}, miss distance ${miss.toFixed(1)} km${eta}`, '#ff4d5e');
        }
        break;
      }
      case 'comms': {
        addComms(d);
        if (lastCommsCollapsed) break; // a restated stance isn't a new story beat
        const from = String(d['from_id'] ?? '?').toUpperCase();
        const words = (d['rationale'] as string | undefined) ?? '';
        if (d['cannot_maneuver']) {
          enqueueCaption(`${from}: “I CANNOT MOVE”`, firstSentence(words), '#ff6b6b');
        } else if (d['concede_row']) {
          enqueueCaption(`${from} CONCEDES RIGHT-OF-WAY`, firstSentence(words), '#ffb03a');
        }
        break;
      }
      case 'proposal': {
        const fromId = d['proposer_id'] as string | undefined;
        if (!fromId) {
          // Status notices share the proposal type (fallback engaged,
          // unresolved, referee-rejected) — they carry a note, not a burn.
          const note = (d['note'] as string | undefined) ?? 'negotiation update';
          log(ev.t, `NOTE  ${note}`, 'proposal');
          break;
        }
        // Drives the 3D burn-intent overlay only; the comms bubble carries
        // the words (older timelines without comms events still get this).
        const recipientId = d['recipient_id'] as string | undefined;
        const conj = activeConjs.find(c => c.aId === fromId || c.bId === fromId);
        const toId = recipientId
          ?? (conj ? (conj.aId === fromId ? conj.bId : conj.aId) : '');
        if (toId) startProposal(fromId, toId);
        break;
      }
      case 'maneuver_committed': {
        const objId = d['obj_id'] as string;
        clearProposal();
        addManeuverArrow(objId, d['dv_vector'] as Vec3);
        const dvMs = (d['est_dv_cost'] as number) * 1000;
        log(ev.t, `⚖ ✓ BURN  ${objId}  —  Δv ${dvMs.toFixed(1)} m/s`, 'maneuver');
        enqueueCaption(`BURN — ${objId.toUpperCase()}`, `Δv ${dvMs.toFixed(1)} m/s, verified by the physics referee`, '#ffa060');
        break;
      }
      case 'resolved': {
        isResolved = true;
        activeConjs = [];
        clearAllConj(); clearProposal(); clearAllArrows();
        showResolvedLabels();
        const totMs = (d['total_dv_km_s'] as number) * 1000;
        log(ev.t, `ALL CLEAR  —  total Δv ${totMs.toFixed(1)} m/s`, 'safe');
        enqueueCaption('ALL CLEAR', `negotiated peer-to-peer, physics-verified — ${totMs.toFixed(1)} m/s of fuel total`, '#3ddc97');
        if (tl) setTimeout(() => showOutcomeCard(tl!), 1400);
        break;
      }
    }
  }
}

// ── Story mode — narrated playback ────────────────────────────────────────────
// Negotiations happen at a single sim instant, so raw playback dumps them in a
// blink. In story mode the orbital clock FREEZES at each event cluster and the
// beats play out one at a time on the wall clock — including a synthetic
// referee beat before every committed burn (the physics check made visible).
type RefereeBeat = { type: 'referee-verify'; t: number; data: Record<string, unknown> };
type NarrationItem = TLEvent | RefereeBeat;

let guided = true;
let narrating = false;
let narrationQueue: NarrationItem[] = [];
let narrationNextMs = 0;

function beatDuration(item: NarrationItem): number {
  let base: number;
  if (item.type === 'comms') {
    const len = ((item.data['rationale'] as string | undefined) ?? '').length;
    base = Math.min(1200 + len * 8, 2800); // reading time scales with the words
  } else if (item.type === 'referee-verify') base = 1400;
  else if (item.type === 'conjunction_detected' || item.type === 'new_conjunction') base = 2000;
  else base = 1100;
  // The speed selector also paces the story: 60× reads brisk, 10× leisurely.
  return base * Math.min(1.5, Math.max(0.5, 30 / speed));
}

function buildNarration(evts: TLEvent[]): NarrationItem[] {
  const out: NarrationItem[] = [];
  for (const e of evts) {
    if (e.type === 'proposal') {
      applyOneEvent(e); // overlay-only (burn-intent arc) — not a story beat
      continue;
    }
    if (e.type === 'maneuver_committed') out.push({ type: 'referee-verify', t: e.t, data: e.data });
    out.push(e);
  }
  return out;
}

function applyRefereeBeat(beat: RefereeBeat) {
  const objId = String(beat.data['obj_id'] ?? '?');
  log(beat.t, `⚖ REFEREE  VERIFYING ${objId}'s burn — propagate → screen → fuel check…`, 'referee');
  enqueueCaption(
    'PHYSICS REFEREE — VERIFYING',
    `does ${objId}'s burn actually clear? propagation, conjunction screening, fuel budget`,
    '#9fd8ff',
  );
}

function stepNarration(nowMs: number) {
  if (nowMs < narrationNextMs) return;
  const item = narrationQueue.shift();
  if (item) {
    bubbleBatch = 0;
    if (item.type === 'referee-verify') applyRefereeBeat(item as RefereeBeat);
    else applyOneEvent(item as TLEvent);
    // A message that folded into an existing bubble isn't a new beat — move on.
    const dwell = item.type === 'comms' && lastCommsCollapsed ? 350 : beatDuration(item);
    narrationNextMs = nowMs + dwell;
  }
  if (!narrationQueue.length && nowMs >= narrationNextMs - 1) narrating = false;
}

// Apply any half-narrated beats instantly (scrub, story-mode toggle, replay).
function flushNarration() {
  if (!narrating && !narrationQueue.length) return;
  suppressCaptions = true;
  for (const item of narrationQueue) {
    if (item.type !== 'referee-verify') applyOneEvent(item as TLEvent);
  }
  suppressCaptions = false;
  narrationQueue = [];
  narrating = false;
}

// Full rebuild when scrubbing backwards or replaying: reset visuals AND the
// event log, then replay through processForwardEvents (which maintains both) —
// appending over a stale log duplicated entries on every replay.
function rebuildState(evts: TLEvent[], upToT: number) {
  activeConjs = []; isResolved = false;
  clearAllConj(); clearProposal(); clearAllArrows(); clearResolvedLabels();
  eventLog.innerHTML = '';
  outcomeCard.classList.remove('visible');
  resetComms();
  resetCaptions();
  narrationQueue = [];
  narrating = false;
  suppressCaptions = true; // a scrub is not a story beat
  processForwardEvents(evts, tMin - 1e-3, upToT);
  suppressCaptions = false;
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

// ── Comms channel — the negotiation, in the agents' own words ────────────────
const SAT_CHAT_COLORS = ['#58c7ff', '#ffb03a', '#c792ea', '#3ddc97', '#ff8fa3', '#9fb4c7'];
const chatColors = new Map<string, string>();
function satChatColor(id: string): string {
  if (!chatColors.has(id)) chatColors.set(id, SAT_CHAT_COLORS[chatColors.size % SAT_CHAT_COLORS.length]);
  return chatColors.get(id)!;
}

const chatSides = new Map<string, 'left' | 'right'>();
// One bubble per (sender, stance) per episode: negotiation rounds re-send the
// same stances, and repeats fold into the first bubble's rounds counter.
const episodeBubbles = new Map<string, { el: HTMLElement; rounds: number }>();
let lastCommsCollapsed = false; // did the most recent addComms fold into an old bubble?
let bubbleBatch = 0; // bubbles added in the current forward pass (staggers entry)

function commsBadge(d: Record<string, unknown>): { label: string; cls: string } {
  if (d['cannot_maneuver']) return { label: 'CANNOT MANEUVER', cls: 'k-cannot' };
  if (d['assert_row'])      return { label: 'ASSERTS RIGHT-OF-WAY', cls: 'k-assert' };
  if (d['concede_row'])     return { label: 'CONCEDES — TAKES THE BURN', cls: 'k-concede' };
  if (d['kind'] === 'propose') {
    const dv = d['est_dv_cost'] as number | undefined;
    return { label: `PROPOSES BURN${dv ? `  ${(dv * 1000).toFixed(1)} m/s` : ''}`, cls: 'k-propose' };
  }
  if (d['kind'] === 'accept')  return { label: 'ACCEPTS', cls: 'k-accept' };
  if (d['directive'])          return { label: 'DIRECTIVE', cls: 'k-directive' };
  return { label: String(d['kind'] ?? 'MSG').toUpperCase(), cls: 'k-directive' };
}

function addComms(d: Record<string, unknown>) {
  const from = String(d['from_id'] ?? '?');
  const to = String(d['to_id'] ?? '?');
  const { label, cls } = commsBadge(d);
  const rationale = (d['rationale'] as string | undefined) ?? '';

  const key = `${from}|${label}`;
  const prev = episodeBubbles.get(key);
  if (prev) {
    prev.rounds += 1;
    let tag = prev.el.querySelector<HTMLElement>('.comms-rounds');
    if (!tag) {
      tag = document.createElement('div');
      tag.className = 'comms-rounds';
      prev.el.appendChild(tag);
    }
    tag.textContent = `RESTATED — ${prev.rounds} ROUNDS`;
    lastCommsCollapsed = true;
    return;
  }
  lastCommsCollapsed = false;

  if (!chatSides.has(from)) chatSides.set(from, chatSides.size % 2 ? 'right' : 'left');

  const el = document.createElement('div');
  el.className = `comms-bubble ${chatSides.get(from)}`;
  el.style.setProperty('--sat-color', satChatColor(from));
  el.style.animationDelay = `${Math.min(bubbleBatch * 0.14, 0.7)}s`;
  bubbleBatch += 1;

  const route = document.createElement('div');
  route.className = 'comms-route';
  const fromEl = document.createElement('span');
  fromEl.className = 'comms-from';
  fromEl.textContent = from.toUpperCase();
  const toEl = document.createElement('span');
  toEl.className = 'comms-to';
  toEl.textContent = `→ ${to.toUpperCase()}`;
  const kindEl = document.createElement('span');
  kindEl.className = `comms-kind ${cls}`;
  kindEl.textContent = label;
  route.append(fromEl, toEl, kindEl);
  el.appendChild(route);

  if (rationale) {
    const text = document.createElement('div');
    text.className = 'comms-text';
    text.textContent = rationale;
    el.appendChild(text);
  }

  eventLog.appendChild(el);
  eventLog.scrollTop = eventLog.scrollHeight;
  episodeBubbles.set(key, { el, rounds: 1 });
}

function resetComms() {
  episodeBubbles.clear();
  lastCommsCollapsed = false;
  bubbleBatch = 0;
  // keep chatColors/chatSides stable across replays so identities don't shift
}

// ── Story captions — cinematic lower-third narration ─────────────────────────
const captionEl = document.getElementById('caption')!;
const captionHead = document.getElementById('caption-headline')!;
const captionSub = document.getElementById('caption-sub')!;
const capQueue: { head: string; sub: string; color: string; sticky?: boolean }[] = [];
let capTimer: ReturnType<typeof setTimeout> | null = null;
let capActive = false;
let capSticky = false; // current caption stays until dismissed (the play invite)
let suppressCaptions = false; // true while rebuilding state for a scrub

let lastCapHead = '';
function enqueueCaption(head: string, sub: string, color: string, sticky = false) {
  if (suppressCaptions) return;
  if (head === lastCapHead) return; // a re-sent beat is one caption, not two
  lastCapHead = head;
  capQueue.push({ head, sub, color, sticky });
  pumpCaptions();
}

function pumpCaptions() {
  if (capActive) return;
  const c = capQueue.shift();
  if (!c) return;
  capActive = true;
  capSticky = !!c.sticky;
  captionEl.style.setProperty('--cap-color', c.color);
  captionEl.style.setProperty('--cap-glow', `${c.color}66`);
  captionHead.textContent = c.head;
  captionSub.textContent = c.sub;
  captionEl.classList.add('visible');
  if (!c.sticky) {
    capTimer = setTimeout(() => {
      captionEl.classList.remove('visible');
      capTimer = setTimeout(() => { capActive = false; pumpCaptions(); }, 450);
    }, 3400);
  }
}

function dismissStickyCaption() {
  if (!capActive || !capSticky) return;
  capSticky = false;
  captionEl.classList.remove('visible');
  capTimer = setTimeout(() => { capActive = false; pumpCaptions(); }, 450);
}

function resetCaptions() {
  capQueue.length = 0;
  if (capTimer) clearTimeout(capTimer);
  capTimer = null;
  capActive = false;
  lastCapHead = '';
  captionEl.classList.remove('visible');
}

function firstSentence(s: string, max = 130): string {
  const stop = s.indexOf('. ');
  const cut = stop > 20 && stop < max ? s.slice(0, stop + 1) : s.slice(0, max);
  return cut.length < s.length && !cut.endsWith('.') ? `${cut.trimEnd()}…` : cut;
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
    if (!(ev.type in EVT_MARK_CLASS)) return; // comms are too dense to mark
    const frac = (ev.t - tMin) / range;
    const mark = document.createElement('div');
    mark.className = `ev-mark ${EVT_MARK_CLASS[ev.type]}`;
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
let speed    = 30;
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

  outcomeCard.classList.remove('visible');
  eventLog.innerHTML = '';
  scrubber.value = '0';
  updatePlayBtn();
  updateTimeDsp();
  updatePhaseBadge();
  updateEventMarkers(data.events, tMin, tMax);

  resetComms();
  resetCaptions();
  narrationQueue = [];
  narrating = false;
  log(tMin, `Loaded — ${ids.length} objects, ${data.events.length} events`, 'info');
  // Start a hair before tMin so events at exactly t=tMin (the opening
  // conjunction + first messages) unfold ON PLAY — the story starts live.
  playTime = tMin - 1e-3;
  const firstConj = data.events.find(e => e.type === 'conjunction_detected');
  if (firstConj) {
    const cd = firstConj.data;
    enqueueCaption(
      'TWO SATELLITES, ONE COLLISION COURSE',
      `${cd['a_id']} / ${cd['b_id']} — press ▶ to watch them negotiate their way out`,
      '#58c7ff',
      true,
    );
  }

  // Update sim toggle count badge
  const simBtn = document.getElementById('sim-toggle');
  if (simBtn) {
    const countEl = simBtn.querySelector<HTMLElement>('.btn-count');
    if (countEl) countEl.textContent = `(${ids.length})`;
    simBtn.classList.toggle('active', simVisible);
  }
}

// ── Animation loop ────────────────────────────────────────────────────────────
let lastMs = performance.now();

function frame() {
  requestAnimationFrame(frame);

  const nowMs = performance.now();
  // Clamp the frame delta: after a background-tab rAF stall the sim clock
  // would otherwise lurch across whole story beats in one frame.
  const dtMs  = Math.min(nowMs - lastMs, 100);
  lastMs = nowMs;

  if (tl) {
    if (playing) {
      if (narrating) {
        stepNarration(nowMs); // orbital clock frozen while the story beat plays
      } else {
        const prev = playTime;
        let dt = (dtMs / 1000) * speed;
        if (guided) {
          // Quiet-span compression: nothing happens between beats, so reach
          // the next event (or the end) in ~4s of wall time instead of coasting.
          const nextT = tl.events.find(e => e.t > playTime + 1e-6)?.t ?? tMax;
          if ((nextT - playTime) / speed > 4.5) dt = (dtMs / 1000) * ((nextT - playTime) / 4);
        }
        playTime = Math.min(tMax, playTime + dt);
        if (guided) {
          const first = tl.events.find(e => e.t > prev && e.t <= playTime);
          if (first) {
            // Clamp to the first crossed cluster and narrate it beat by beat.
            playTime = first.t;
            narrationQueue = buildNarration(
              tl.events.filter(e => e.t > prev && Math.abs(e.t - first.t) < 0.5),
            );
            narrating = true;
            narrationNextMs = nowMs;
          }
        } else {
          processForwardEvents(tl.events, prev, playTime);
        }
        if (playTime >= tMax && !narrating) { playing = false; updatePlayBtn(); }
        scrubber.value = String(Math.round(((playTime - tMin) / (tMax - tMin)) * 1000));
      }
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

// ── Outcome card ──────────────────────────────────────────────────────────────
const outcomeCard = document.getElementById('outcome-card')!;

function showOutcomeCard(timeline: Timeline) {
  const m = timeline.meta as Record<string, unknown>;
  const evts = timeline.events;

  const converged = m['converged'] as boolean ?? true;
  const dvMs  = ((m['total_dv_km_s'] as number ?? 0) * 1000).toFixed(1);
  const rounds = String(m['rounds_total'] as number ?? 0);
  const topology = String(m['topology'] as string ?? '').toUpperCase();
  const scenario = String(m['scenario'] as string ?? '');
  const conjCount = evts.filter(e => e.type === 'conjunction_detected' || e.type === 'new_conjunction').length;
  const manCount  = evts.filter(e => e.type === 'maneuver_committed').length;
  const resolvedEvt = evts.find(e => e.type === 'resolved');
  const timeToClr = resolvedEvt ? String(Math.round(resolvedEvt.t)) : '—';

  (document.getElementById('outcome-headline')!).textContent = converged ? 'RESOLVED' : 'UNRESOLVED';
  (document.getElementById('outcome-scenario')!).textContent = scenario.toUpperCase();
  (document.getElementById('stat-dv')!).textContent = dvMs;
  (document.getElementById('stat-conjunctions')!).textContent = String(conjCount);
  (document.getElementById('stat-maneuvers')!).textContent = String(manCount);
  (document.getElementById('stat-rounds')!).textContent = rounds;
  (document.getElementById('stat-time')!).textContent = timeToClr;
  (document.getElementById('stat-topology')!).textContent = topology;

  outcomeCard.classList.toggle('failed', !converged);
  outcomeCard.classList.add('visible');
}

document.getElementById('outcome-dismiss')?.addEventListener('click', () => {
  outcomeCard.classList.remove('visible');
});
outcomeCard.addEventListener('click', e => {
  if (e.target === outcomeCard) outcomeCard.classList.remove('visible');
});

// ── UI helpers ────────────────────────────────────────────────────────────────
function updatePlayBtn() { playBtn.textContent = playing ? '⏸' : '▶'; }

function updateTimeDsp() {
  const shown = Math.max(playTime, tMin);
  const mins = Math.floor(shown / 60);
  const secs = Math.floor(shown % 60);
  timeDsp.textContent = `T+${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
}

// ── UI wiring ─────────────────────────────────────────────────────────────────
playBtn.addEventListener('click', () => {
  if (!tl) return;
  if (!playing && playTime >= tMax) {
    playTime = tMin - 1e-3; // replay the whole story, t=tMin beats included
    rebuildState(tl.events, playTime);
    scrubber.value = '0';
  }
  playing = !playing;
  if (playing) dismissStickyCaption();
  updatePlayBtn();
});

scrubber.addEventListener('input', () => {
  if (!tl) return;
  const frac = parseFloat(scrubber.value) / 1000;
  const newT = tMin + frac * (tMax - tMin);
  const wasPlaying = playing;
  playing = false;
  flushNarration();

  if (newT < playTime) {
    rebuildState(tl.events, newT);
  } else {
    suppressCaptions = true; // a scrub is not a story beat
    processForwardEvents(tl.events, playTime, newT);
    suppressCaptions = false;
    resetCaptions(); // drop any caption that was mid-flight
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

const storyBtn = document.getElementById('story-btn');
storyBtn?.addEventListener('click', () => {
  guided = !guided;
  if (!guided) flushNarration();
  storyBtn.classList.toggle('on', guided);
});

document.getElementById('live-btn')?.addEventListener('click', () => {
  fetchLiveEarth(earthMat).catch(console.warn);
});

// ── RUN SIMULATION button ─────────────────────────────────────────────────────
{
  const runBtn = document.getElementById('run-btn') as HTMLButtonElement | null;
  const API = 'http://localhost:8000';

  runBtn?.addEventListener('click', async () => {
    if (!runBtn || runBtn.disabled) return;
    runBtn.disabled = true;
    runBtn.textContent = '⟳ RUNNING…';
    try {
      const resp = await fetch(`${API}/run?topology=hierarchical`, { method: 'POST' });
      if (!resp.ok) throw new Error(`API ${resp.status}: ${await resp.text()}`);
      const data = await resp.json() as Timeline;
      loadTimeline(data);
      playing = true;
      updatePlayBtn();
    } catch (err) {
      console.error('Run failed:', err);
      alert(`Simulation failed: ${err}`);
    } finally {
      runBtn.disabled = false;
      runBtn.textContent = '▶ RUN';
    }
  });
}

// ── Live satellite click-to-label ─────────────────────────────────────────────
{
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let mouseDownX = 0, mouseDownY = 0;

  renderer.domElement.addEventListener('mousedown', e => {
    mouseDownX = e.clientX; mouseDownY = e.clientY;
  });

  renderer.domElement.addEventListener('click', e => {
    // Ignore drag operations (OrbitControls pan/rotate)
    if (Math.hypot(e.clientX - mouseDownX, e.clientY - mouseDownY) > 5) return;

    const rect = renderer.domElement.getBoundingClientRect();
    mouse.set(
      ((e.clientX - rect.left) / rect.width)  *  2 - 1,
      ((e.clientY - rect.top)  / rect.height) * -2 + 1,
    );
    raycaster.setFromCamera(mouse, camera);
    const hit = liveLayer.handleClick(raycaster, camera.position.length());
    if (!hit) liveLayer.clearPickLabel();
  });
}

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

// ── Simulation visibility toggle ──────────────────────────────────────────────
let simVisible = true;

function setSimVisible(v: boolean) {
  simVisible = v;
  sats.forEach(sat => {
    sat.mesh.visible = v;
    sat.trailLine.visible = v;
    if (sat.orbitRing) sat.orbitRing.visible = v;
  });
  // conjunction / proposal overlays track sim sats — hide them too
  if (!v) {
    conjLines.forEach(l => { l.visible = false; });
    conjMidPts.forEach(m => { m.visible = false; });
    manArrows.forEach(a => { a.visible = false; });
    if (propLine) propLine.visible = false;
    if (propPacket) propPacket.visible = false;
    resolvedLabels.forEach((obj, id) => { sats.get(id)?.mesh && (sats.get(id)!.mesh.visible = false); });
  } else {
    conjLines.forEach(l => { l.visible = true; });
    conjMidPts.forEach(m => { m.visible = true; });
    manArrows.forEach(a => { a.visible = true; });
    if (propLine) propLine.visible = true;
    if (propPacket) propPacket.visible = true;
  }
}

document.getElementById('sim-toggle')?.addEventListener('click', function(this: HTMLElement) {
  simVisible = !simVisible;
  setSimVisible(simVisible);
  this.classList.toggle('active', simVisible);
  const count = sats.size;
  const countEl = this.querySelector<HTMLElement>('.btn-count');
  if (countEl) countEl.textContent = `(${count})`;
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
// Load the bundled demo run; fall back to the legacy fixture name.
// URL params for recording clips: ?clean hides the operator chrome,
// ?autoplay starts the story on load.
// ?timeline=forced-trade loads ./timeline-forced-trade.json (etc.).
const bootParams = new URLSearchParams(location.search);
if (bootParams.has('clean')) document.body.classList.add('clean');
const tlName = bootParams.get('timeline');
const tlFile = tlName ? `./timeline-${tlName}.json` : './timeline.json';
fetch(tlFile)
  .then(r => (r.ok ? r.json() : fetch('./sample_timeline.json').then(r2 => r2.json())))
  .then((data: Timeline) => {
    loadTimeline(data);
    if (bootParams.has('autoplay')) {
      playing = true;
      dismissStickyCaption();
      updatePlayBtn();
    }
  })
  .catch(err => {
    subtitleEl.textContent = 'Drop a timeline JSON to begin';
    console.warn('timeline.json not loaded:', err);
  });

frame();
