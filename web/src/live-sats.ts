import { json2satrec, propagate, type SatRec, type OMMJsonObject } from 'satellite.js';
import * as THREE from 'three';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

// Must match main.ts
const S = 1 / 6878;
const CELESTRAK = 'https://celestrak.org/NORAD/elements/gp.php';
// CelesTrak rate-limits to once per 2h per group — cache in localStorage
const CACHE_TTL_MS = 2 * 60 * 60 * 1000;

function cacheKey(groupId: string) { return `celestrak_${groupId}`; }

function loadCached(groupId: string): OMMJsonObject[] | null {
  try {
    const raw = localStorage.getItem(cacheKey(groupId));
    if (!raw) return null;
    const { ts, data } = JSON.parse(raw) as { ts: number; data: OMMJsonObject[] };
    if (Date.now() - ts > CACHE_TTL_MS) return null;
    return data;
  } catch { return null; }
}

function saveCache(groupId: string, data: OMMJsonObject[]) {
  try {
    localStorage.setItem(cacheKey(groupId), JSON.stringify({ ts: Date.now(), data }));
  } catch { /* storage full — skip */ }
}

interface TrackedSat {
  name: string;
  noradId: string;
  satrec: SatRec;
  pos: THREE.Vector3;  // current scene-unit position
}

interface GroupConfig {
  id: string;
  label: string;
  color: number;
  labeled: boolean;   // show CSS2D name labels (only for small groups)
  maxCount: number;   // cap for dense groups
}

const GROUPS: GroupConfig[] = [
  { id: 'stations',   label: 'STATIONS', color: 0xffffff,  labeled: true,  maxCount: 20   },
  { id: 'starlink',   label: 'STARLINK', color: 0x4488ff,  labeled: false, maxCount: 500  },
  { id: 'active',     label: 'LEO',      color: 0x888888,  labeled: false, maxCount: 800  },
];

export { GROUPS };

interface GroupState {
  cfg:      GroupConfig;
  sats:     TrackedSat[];
  points:   THREE.Points;
  posAttr:  THREE.BufferAttribute;
  meshes:   Array<{ mesh: THREE.Mesh; label: CSS2DObject }>;
  visible:  boolean;
  loaded:   boolean;
  updating: boolean;  // lock while propagating
}

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
      const url = `${CELESTRAK}?GROUP=${groupId}&FORMAT=json`;
      const resp = await fetch(url);
      if (resp.status === 403) {
        // CelesTrak rate-limit: "data has not updated since last download"
        throw new Error(`CelesTrak ${groupId}: rate-limited (try again in 2h)`);
      }
      if (!resp.ok) throw new Error(`CelesTrak ${groupId}: HTTP ${resp.status}`);
      omms = await resp.json() as OMMJsonObject[];
      saveCache(groupId, omms);
    }
    const sats: TrackedSat[] = [];

    for (const omm of omms.slice(0, cfg.maxCount)) {
      try {
        const satrec = json2satrec(omm);
        if (!satrec) continue;
        sats.push({
          name:    String(omm.OBJECT_NAME).trim(),
          noradId: String(omm.NORAD_CAT_ID),
          satrec,
          pos: new THREE.Vector3(),
        });
      } catch { /* skip bad TLEs */ }
    }

    // Build Three.js geometry for all sats in this group
    const N = sats.length;
    const posArr = new Float32Array(N * 3);
    const posAttr = new THREE.BufferAttribute(posArr, 3);
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', posAttr);

    const pointsMat = new THREE.PointsMaterial({
      color: cfg.color,
      size: cfg.labeled ? 0.018 : 0.010,
      sizeAttenuation: true,
      transparent: true,
      opacity: cfg.labeled ? 0.95 : 0.55,
    });
    const points = new THREE.Points(geom, pointsMat);
    points.visible = false;
    this.scene.add(points);

    // For labeled groups, also create individual meshes + CSS2D labels
    const meshes: GroupState['meshes'] = [];
    if (cfg.labeled) {
      const meshMat = new THREE.MeshBasicMaterial({ color: cfg.color });
      const meshGeom = new THREE.SphereGeometry(0.012, 8, 5);
      for (const sat of sats) {
        const mesh = new THREE.Mesh(meshGeom, meshMat);
        mesh.visible = false;
        const div = document.createElement('div');
        div.className = 'live-label';
        div.textContent = sat.name;
        const label = new CSS2DObject(div);
        label.position.set(0, 0.025, 0);
        mesh.add(label);
        this.scene.add(mesh);
        meshes.push({ mesh, label });
      }
    }

    const state: GroupState = {
      cfg, sats, points, posAttr, meshes,
      visible: false, loaded: true, updating: false,
    };
    this.groups.set(groupId, state);

    // Propagate immediately to show something on first toggle
    this.propagateGroup(state, new Date());

    return N;
  }

  private propagateGroup(state: GroupState, date: Date) {
    if (state.updating) return;
    state.updating = true;
    const { sats, posAttr, meshes, cfg } = state;

    for (let i = 0; i < sats.length; i++) {
      const sat = sats[i];
      const pv = propagate(sat.satrec, date);
      if (!pv || !pv.position) {
        sat.pos.set(0, 0, 0);
      } else {
        const { x, y, z } = pv.position;
        if (isFinite(x) && isFinite(y) && isFinite(z)) {
          sat.pos.set(x * S, y * S, z * S);
        }
      }
      posAttr.setXYZ(i, sat.pos.x, sat.pos.y, sat.pos.z);
      if (cfg.labeled && meshes[i]) {
        meshes[i].mesh.position.copy(sat.pos);
      }
    }

    posAttr.needsUpdate = true;
    state.points.geometry.computeBoundingSphere();
    state.updating = false;
  }

  // Call from render loop — updates propagation every ~60 frames
  tick60(date: Date) {
    this.tick++;
    if (this.tick % 60 !== 0) return;
    this.groups.forEach(state => {
      if (state.visible && state.loaded) {
        this.propagateGroup(state, date);
      }
    });
  }

  setVisible(groupId: string, visible: boolean) {
    const state = this.groups.get(groupId);
    if (!state) return;
    state.visible = visible;
    state.points.visible = visible;
    for (const { mesh } of state.meshes) {
      mesh.visible = visible;
    }
    if (visible) {
      this.propagateGroup(state, new Date());
    }
  }

  isVisible(groupId: string): boolean {
    return this.groups.get(groupId)?.visible ?? false;
  }

  count(groupId: string): number {
    return this.groups.get(groupId)?.sats.length ?? 0;
  }

  isLoaded(groupId: string): boolean {
    return this.groups.get(groupId)?.loaded ?? false;
  }
}
