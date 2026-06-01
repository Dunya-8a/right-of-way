import { json2satrec, propagate, type SatRec, type OMMJsonObject } from 'satellite.js';
import * as THREE from 'three';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

const S = 1 / 6878;  // must match main.ts
const CELESTRAK = 'https://celestrak.org/NORAD/elements/gp.php';
const CACHE_TTL_MS = 2 * 60 * 60 * 1000;  // CelesTrak rate-limits to once per 2h

// ── LocalStorage cache ────────────────────────────────────────────────────────
function cacheKey(id: string) { return `celestrak_${id}`; }

function loadCached(id: string): OMMJsonObject[] | null {
  try {
    const raw = localStorage.getItem(cacheKey(id));
    if (!raw) return null;
    const { ts, data } = JSON.parse(raw) as { ts: number; data: OMMJsonObject[] };
    if (Date.now() - ts > CACHE_TTL_MS) return null;
    return data;
  } catch { return null; }
}

function saveCache(id: string, data: OMMJsonObject[]) {
  try {
    localStorage.setItem(cacheKey(id), JSON.stringify({ ts: Date.now(), data }));
  } catch { /* quota exceeded — skip */ }
}

// ── Circular glow sprite for Points ──────────────────────────────────────────
function makeGlowSprite(): THREE.Texture {
  const sz = 32;
  const c = document.createElement('canvas');
  c.width = c.height = sz;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(sz/2, sz/2, 0, sz/2, sz/2, sz/2);
  g.addColorStop(0,   'rgba(255,255,255,1)');
  g.addColorStop(0.35,'rgba(255,255,255,0.8)');
  g.addColorStop(0.7, 'rgba(255,255,255,0.2)');
  g.addColorStop(1,   'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, sz, sz);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ── Group config ──────────────────────────────────────────────────────────────
interface GroupConfig {
  id:       string;
  label:    string;
  color:    number;
  labeled:  boolean;   // render individual meshes + CSS2D names (small groups only)
  dotSize:  number;    // PointsMaterial size in scene units
  maxCount: number;
}

const GROUPS: GroupConfig[] = [
  { id: 'stations', label: 'STATIONS', color: 0xffffff, labeled: true,  dotSize: 0.022, maxCount: 30  },
  { id: 'starlink', label: 'STARLINK', color: 0x5599ff, labeled: false, dotSize: 0.030, maxCount: 500 },
  { id: 'active',   label: 'ALL ACTIVE', color: 0x7799aa, labeled: false, dotSize: 0.022, maxCount: 800 },
];

export { GROUPS };

// ── Internal state ────────────────────────────────────────────────────────────
interface TrackedSat {
  name:    string;
  satrec:  SatRec;
  pos:     THREE.Vector3;
}

interface GroupState {
  cfg:      GroupConfig;
  sats:     TrackedSat[];
  // Dense groups: single Points object, fast buffer update
  points:   THREE.Points | null;
  posAttr:  THREE.BufferAttribute | null;
  // Labeled groups: individual sphere meshes with CSS2D names
  meshes:   Array<{ mesh: THREE.Mesh; label: CSS2DObject }>;
  visible:  boolean;
  loaded:   boolean;
  updating: boolean;
}

const SPRITE = makeGlowSprite();

export class LiveSatLayer {
  private scene:  THREE.Scene;
  private groups: Map<string, GroupState> = new Map();
  private tick = 0;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  async loadGroup(groupId: string): Promise<number> {
    const cfg = GROUPS.find(g => g.id === groupId);
    if (!cfg) throw new Error(`Unknown group: ${groupId}`);
    if (this.groups.has(groupId)) return this.groups.get(groupId)!.sats.length;

    let omms = loadCached(groupId);
    if (!omms) {
      const resp = await fetch(`${CELESTRAK}?GROUP=${groupId}&FORMAT=json`);
      if (resp.status === 403)
        throw new Error(`CelesTrak ${groupId}: rate-limited (try again in 2h)`);
      if (!resp.ok)
        throw new Error(`CelesTrak ${groupId}: HTTP ${resp.status}`);
      omms = await resp.json() as OMMJsonObject[];
      saveCache(groupId, omms);
    }

    const sats: TrackedSat[] = [];
    for (const omm of omms.slice(0, cfg.maxCount)) {
      try {
        const satrec = json2satrec(omm);
        if (satrec) sats.push({ name: String(omm.OBJECT_NAME).trim(), satrec, pos: new THREE.Vector3() });
      } catch { /* bad TLE — skip */ }
    }

    let points:  GroupState['points']  = null;
    let posAttr: GroupState['posAttr'] = null;
    const meshes: GroupState['meshes'] = [];

    if (cfg.labeled) {
      // Small group: individual sphere + CSS2D label per satellite
      const meshMat  = new THREE.MeshBasicMaterial({ color: cfg.color });
      const meshGeom = new THREE.SphereGeometry(0.013, 10, 6);
      for (const sat of sats) {
        const mesh = new THREE.Mesh(meshGeom, meshMat);
        mesh.visible = false;
        const div = document.createElement('div');
        div.className = 'live-label';
        div.textContent = sat.name;
        const label = new CSS2DObject(div);
        label.position.set(0, 0.028, 0);
        mesh.add(label);
        this.scene.add(mesh);
        meshes.push({ mesh, label });
      }
    } else {
      // Dense group: single Points object with glow sprite
      const posArr = new Float32Array(sats.length * 3);
      posAttr = new THREE.BufferAttribute(posArr, 3);
      const geom = new THREE.BufferGeometry();
      geom.setAttribute('position', posAttr);
      const mat = new THREE.PointsMaterial({
        map:             SPRITE,
        color:           cfg.color,
        size:            cfg.dotSize,
        sizeAttenuation: true,
        transparent:     true,
        opacity:         0.85,
        blending:        THREE.AdditiveBlending,
        depthWrite:      false,
        alphaTest:       0.01,
      });
      points = new THREE.Points(geom, mat);
      points.visible = false;
      this.scene.add(points);
    }

    const state: GroupState = {
      cfg, sats, points, posAttr, meshes,
      visible: false, loaded: true, updating: false,
    };
    this.groups.set(groupId, state);
    this.propagateGroup(state, new Date());
    return sats.length;
  }

  private propagateGroup(state: GroupState, date: Date) {
    if (state.updating) return;
    state.updating = true;
    const { sats, posAttr, meshes, cfg } = state;

    for (let i = 0; i < sats.length; i++) {
      const sat = sats[i];
      const pv = propagate(sat.satrec, date);
      if (pv && pv.position) {
        const { x, y, z } = pv.position;
        if (isFinite(x) && isFinite(y) && isFinite(z)) {
          sat.pos.set(x * S, y * S, z * S);
        }
      }
      if (posAttr) posAttr.setXYZ(i, sat.pos.x, sat.pos.y, sat.pos.z);
      if (cfg.labeled && meshes[i]) meshes[i].mesh.position.copy(sat.pos);
    }

    if (posAttr) {
      posAttr.needsUpdate = true;
      state.points?.geometry.computeBoundingSphere();
    }
    state.updating = false;
  }

  // Called every frame; propagates every ~60 frames (≈1s at 60fps)
  tick60(date: Date) {
    if (++this.tick % 60 !== 0) return;
    this.groups.forEach(state => {
      if (state.visible && state.loaded) this.propagateGroup(state, date);
    });
  }

  setVisible(groupId: string, visible: boolean) {
    const state = this.groups.get(groupId);
    if (!state) return;
    state.visible = visible;
    if (state.points) state.points.visible = visible;
    for (const { mesh } of state.meshes) mesh.visible = visible;
    if (visible) this.propagateGroup(state, new Date());
  }

  isVisible(groupId: string): boolean { return this.groups.get(groupId)?.visible ?? false; }
  count(groupId: string):     number  { return this.groups.get(groupId)?.sats.length ?? 0; }
  isLoaded(groupId: string):  boolean { return this.groups.get(groupId)?.loaded ?? false; }
}
