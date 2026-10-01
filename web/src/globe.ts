// The calm 3D backdrop for Close Call: Earth, the two objects, their paths
// through the encounter, and a marker where they meet. Kept deliberately
// quiet — the story is told in the panel; the globe gives it a place.

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import type { Trajectory, Vec3 } from './orbit.js';

const R_EARTH_KM = 6371;
const S = 1 / 6878; // km -> scene units

export interface GlobeObject { id: string; label: string; color: string; }
export interface GlobePath { traj: Trajectory; t0: number; t1: number; color: string; dashed?: boolean; opacity?: number; }

function glowTexture(): THREE.Texture {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d')!;
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(0.18, 'rgba(255,255,255,0.95)');
  grd.addColorStop(0.4, 'rgba(255,255,255,0.35)');
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function ringTexture(): THREE.Texture {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d')!;
  g.strokeStyle = 'rgba(255,255,255,1)';
  g.lineWidth = 6;
  g.beginPath(); g.arc(64, 64, 52, 0, Math.PI * 2); g.stroke();
  return new THREE.CanvasTexture(c);
}

export class Globe {
  private renderer: THREE.WebGLRenderer;
  private labels: CSS2DRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;
  private glow = glowTexture();
  private sats = new Map<string, { sprite: THREE.Sprite; label: CSS2DObject }>();
  private trajs = new Map<string, Trajectory>();
  private paths: THREE.Line[] = [];
  private marker: THREE.Sprite;
  private arrow: THREE.ArrowHelper | null = null;
  private camGoal: { pos: THREE.Vector3; tgt: THREE.Vector3 } | null = null;
  private userDrove = false;
  private time = 0;
  private reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  constructor(private host: HTMLElement) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    host.appendChild(this.renderer.domElement);
    this.labels = new CSS2DRenderer();
    this.labels.domElement.className = 'globe-labels';
    host.appendChild(this.labels.domElement);

    this.camera = new THREE.PerspectiveCamera(45, 1, 0.001, 200);
    this.camera.position.set(0.6, 0.9, 3.4);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.07;
    this.controls.enablePan = false;
    this.controls.minDistance = 0.08;
    this.controls.maxDistance = 8;
    this.controls.addEventListener('start', () => { this.userDrove = true; this.camGoal = null; });

    // light: a sun off to the side gives the globe a terminator
    this.scene.add(new THREE.AmbientLight(0x5a6a8a, 0.55));
    const sun = new THREE.DirectionalLight(0xfff4e6, 2.1);
    sun.position.set(6, 3, 5);
    this.scene.add(sun);

    // stars
    const v: number[] = [];
    for (let i = 0; i < 2500; i++) {
      const r = 60 + Math.random() * 40, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
      v.push(r * Math.sin(ph) * Math.cos(th), r * Math.sin(ph) * Math.sin(th), r * Math.cos(ph));
    }
    const sg = new THREE.BufferGeometry();
    sg.setAttribute('position', new THREE.Float32BufferAttribute(v, 3));
    this.scene.add(new THREE.Points(sg, new THREE.PointsMaterial({ color: 0x9fb0d0, size: 1.2, sizeAttenuation: false, transparent: true, opacity: 0.7 })));

    // Earth (+Z is the ECI pole; the texture's poles are on Y, so tip it)
    const earthMat = new THREE.MeshPhongMaterial({ color: 0x223355, shininess: 12, specular: new THREE.Color(0x1a2a44) });
    new THREE.TextureLoader().load('/earth.jpg', (t: THREE.Texture) => { t.colorSpace = THREE.SRGBColorSpace; earthMat.map = t; earthMat.color.set(0xffffff); earthMat.needsUpdate = true; });
    const earth = new THREE.Mesh(new THREE.SphereGeometry(R_EARTH_KM * S, 96, 48), earthMat);
    earth.rotation.x = Math.PI / 2;
    this.scene.add(earth);

    // atmosphere: a fresnel rim
    const atmo = new THREE.Mesh(
      new THREE.SphereGeometry(R_EARTH_KM * S * 1.025, 64, 32),
      new THREE.ShaderMaterial({
        transparent: true, side: THREE.BackSide, depthWrite: false,
        uniforms: {},
        vertexShader: `varying vec3 n; varying vec3 p;
          void main(){ n = normalize(normalMatrix*normal); vec4 mv = modelViewMatrix*vec4(position,1.); p = mv.xyz; gl_Position = projectionMatrix*mv; }`,
        fragmentShader: `varying vec3 n; varying vec3 p;
          void main(){ float f = pow(1. - abs(dot(normalize(-p), n)), 2.2); gl_FragColor = vec4(0.35,0.65,1.0, f*0.9); }`,
      }),
    );
    this.scene.add(atmo);

    this.marker = new THREE.Sprite(new THREE.SpriteMaterial({ map: ringTexture(), color: 0xff5d6c, transparent: true, depthTest: false, sizeAttenuation: false }));
    this.marker.scale.setScalar(0.05);
    this.marker.visible = false;
    this.scene.add(this.marker);

    new ResizeObserver(() => this.resize()).observe(host);
    this.resize();
    const loop = () => { requestAnimationFrame(loop); this.render(); };
    loop();
  }

  private resize() {
    const w = this.host.clientWidth, h = this.host.clientHeight;
    if (!w || !h) return;
    this.renderer.setSize(w, h);
    this.labels.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  setObjects(objs: GlobeObject[]) {
    for (const { sprite, label } of this.sats.values()) {
      this.scene.remove(sprite);
      label.element.remove();
    }
    this.sats.clear();
    for (const [i, o] of objs.entries()) {
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
        map: this.glow, color: new THREE.Color(o.color), transparent: true, depthTest: false, sizeAttenuation: false,
      }));
      sprite.scale.setScalar(0.032);
      const div = document.createElement('div');
      div.className = 'globe-label';
      div.style.setProperty('--c', o.color);
      div.textContent = o.label;
      const label = new CSS2DObject(div);
      // first label to the right of its dot, second to the left, so they don't collide
      label.center.set(i % 2 ? 1.12 : -0.12, 0.5);
      sprite.add(label);
      this.scene.add(sprite);
      this.sats.set(o.id, { sprite, label });
    }
  }

  setTrajectories(t: Map<string, Trajectory>) { this.trajs = t; this.setTime(this.time); }

  setTime(t: number) {
    this.time = t;
    for (const [id, s] of this.sats) {
      const tr = this.trajs.get(id);
      if (tr) s.sprite.position.set(...(tr.stateAt(t).r.map(x => x * S) as Vec3));
    }
  }

  setPaths(paths: GlobePath[]) {
    this.paths.forEach(l => { this.scene.remove(l); l.geometry.dispose(); });
    this.paths = paths.map(p => {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 200; i++) {
        const t = p.t0 + ((p.t1 - p.t0) * i) / 200;
        pts.push(new THREE.Vector3(...p.traj.stateAt(t).r).multiplyScalar(S));
      }
      const g = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = p.dashed
        ? new THREE.LineDashedMaterial({ color: p.color, dashSize: 0.01, gapSize: 0.008, transparent: true, opacity: p.opacity ?? 0.8 })
        : new THREE.LineBasicMaterial({ color: p.color, transparent: true, opacity: p.opacity ?? 0.9 });
      const line = new THREE.Line(g, mat);
      if (p.dashed) line.computeLineDistances();
      this.scene.add(line);
      return line;
    });
  }

  setEncounter(pointKm: Vec3 | null, color = '#ff5d6c') {
    this.marker.visible = !!pointKm;
    if (pointKm) {
      this.marker.position.set(...(pointKm.map(x => x * S) as Vec3));
      (this.marker.material as THREE.SpriteMaterial).color.set(color);
    }
  }

  setBurn(atKm: Vec3 | null, dir: Vec3 | null) {
    if (this.arrow) { this.scene.remove(this.arrow); this.arrow = null; }
    if (!atKm || !dir) return;
    const d = new THREE.Vector3(...dir);
    if (d.lengthSq() < 1e-16) return;
    this.arrow = new THREE.ArrowHelper(d.normalize(), new THREE.Vector3(...atKm).multiplyScalar(S), 0.1, 0xffb347, 0.025, 0.012);
    this.scene.add(this.arrow);
  }

  /** Ease the camera to look at a point in orbit, Earth's limb behind it. */
  frame(pointKm: Vec3, distance = 0.55) {
    const p = new THREE.Vector3(...pointKm).multiplyScalar(S);
    const out = p.clone().normalize();
    let side = new THREE.Vector3(0, 0, 1).cross(out);
    if (side.lengthSq() < 1e-6) side = new THREE.Vector3(1, 0, 0);
    side.normalize();
    const pos = p.clone().add(out.multiplyScalar(distance * 0.75)).add(side.multiplyScalar(distance * 0.6));
    this.camGoal = { pos, tgt: p };
    this.userDrove = false;
    if (this.reduceMotion) { this.camera.position.copy(pos); this.controls.target.copy(p); this.camGoal = null; }
  }

  wide() {
    this.camGoal = { pos: new THREE.Vector3(0.6, 0.9, 3.4), tgt: new THREE.Vector3() };
    this.userDrove = false;
  }

  private render() {
    if (this.camGoal && !this.userDrove) {
      this.camera.position.lerp(this.camGoal.pos, 0.035);
      this.controls.target.lerp(this.camGoal.tgt, 0.05);
      if (this.camera.position.distanceTo(this.camGoal.pos) < 1e-3) this.camGoal = null;
    }
    if (this.marker.visible) {
      const k = 0.045 + 0.012 * Math.sin(performance.now() / 300);
      this.marker.scale.setScalar(this.reduceMotion ? 0.05 : k);
    }
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    this.labels.render(this.scene, this.camera);
  }
}
