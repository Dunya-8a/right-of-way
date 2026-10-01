// Closest-approach chart: separation between two objects over time, on a log
// axis so a 6,000 km gap and a 0.9 km near-miss read on one plot. The danger
// band under the conjunction threshold is the whole point — a curve dipping
// into it is a collision risk; a burn that lifts it out is a verified dodge.

export interface Series {
  key: string;
  color: string;
  dashed?: boolean;
  points: [number, number][]; // [t seconds, separation km], ascending t
  revealFrom?: number;        // hidden before this time (a prediction made at t)
  revealToCursor?: boolean;   // draw only up to the cursor (history, not forecast)
  minLabel?: string;          // annotate the series minimum, e.g. "0.90 km predicted"
  minLabelAfterCursor?: boolean; // only once the cursor has passed the minimum
  width?: number;
}

const Y_MIN = 0.2, Y_MAX = 20000;
const TICKS = [1, 10, 100, 1000, 10000];

function fmtKm(km: number): string {
  if (km >= 1000) return `${(km / 1000).toFixed(km >= 10000 ? 0 : 1)}k`;
  return km >= 10 ? km.toFixed(0) : km.toFixed(km >= 1 ? 1 : 2);
}

export class ApproachChart {
  private ctx: CanvasRenderingContext2D;
  private series: Series[] = [];
  private t0 = 0;
  private t1 = 1;
  private cursor = 0;
  private threshold = 5;
  private dirty = true;

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!;
    new ResizeObserver(() => { this.dirty = true; }).observe(canvas);
  }

  set(series: Series[], t0: number, t1: number, threshold: number) {
    this.series = series;
    this.t0 = t0;
    this.t1 = Math.max(t1, t0 + 1);
    this.threshold = threshold;
    this.dirty = true;
  }

  setCursor(t: number) {
    if (Math.abs(t - this.cursor) < 1e-6) return;
    this.cursor = t;
    this.dirty = true;
  }

  /** Draw if anything changed. Cheap to call every animation frame. */
  render() {
    if (!this.dirty) return;
    this.dirty = false;
    const { canvas, ctx } = this;
    const dpr = Math.min(devicePixelRatio, 2);
    const W = canvas.clientWidth, H = canvas.clientHeight;
    if (!W || !H) return;
    if (canvas.width !== Math.round(W * dpr)) canvas.width = Math.round(W * dpr);
    if (canvas.height !== Math.round(H * dpr)) canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    const padL = 38, padR = 10, padT = 8, padB = 18;
    const pw = W - padL - padR, ph = H - padT - padB;
    const x = (t: number) => padL + ((t - this.t0) / (this.t1 - this.t0)) * pw;
    const ly0 = Math.log10(Y_MIN), ly1 = Math.log10(Y_MAX);
    const y = (km: number) => {
      const l = Math.log10(Math.min(Y_MAX, Math.max(Y_MIN, km)));
      return padT + (1 - (l - ly0) / (ly1 - ly0)) * ph;
    };

    ctx.font = '10px ui-monospace, SF Mono, Menlo, monospace';

    // danger band: below the conjunction threshold
    const yThr = y(this.threshold);
    const band = ctx.createLinearGradient(0, yThr, 0, padT + ph);
    band.addColorStop(0, 'rgba(255,48,64,0.28)');
    band.addColorStop(1, 'rgba(255,48,64,0.08)');
    ctx.fillStyle = band;
    ctx.fillRect(padL, yThr, pw, padT + ph - yThr);
    ctx.strokeStyle = 'rgba(255,80,90,0.75)';
    ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.moveTo(padL, yThr); ctx.lineTo(padL + pw, yThr); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(255,120,128,0.9)';
    ctx.textAlign = 'left';
    ctx.fillText(`DANGER < ${this.threshold} km`, padL + 4, padT + ph - 4);

    // grid + y labels
    ctx.textAlign = 'right';
    for (const tk of TICKS) {
      const yy = y(tk);
      ctx.strokeStyle = 'rgba(0,212,255,0.08)';
      ctx.beginPath(); ctx.moveTo(padL, yy); ctx.lineTo(padL + pw, yy); ctx.stroke();
      ctx.fillStyle = 'rgba(160,210,235,0.5)';
      ctx.fillText(`${fmtKm(tk)}`, padL - 5, yy + 3);
    }
    ctx.save();
    ctx.translate(9, padT + ph / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(160,210,235,0.4)';
    ctx.fillText('km apart', 0, 0);
    ctx.restore();

    // x labels: minutes
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(160,210,235,0.45)';
    const span = this.t1 - this.t0;
    const stepMin = span > 1800 ? 10 : span > 900 ? 5 : 2;
    for (let m = Math.ceil(this.t0 / 60 / stepMin) * stepMin; m * 60 <= this.t1; m += stepMin) {
      ctx.fillText(`${m}m`, x(m * 60), H - 4);
    }

    // series (labels are collected, then placed without overlapping)
    const labels: { x: number; y: number; text: string; color: string }[] = [];
    for (const s of this.series) {
      if (s.revealFrom !== undefined && this.cursor < s.revealFrom) continue;
      const pts = s.revealToCursor ? s.points.filter(p => p[0] <= this.cursor) : s.points;
      if (pts.length < 2) continue;
      ctx.strokeStyle = s.color;
      ctx.lineWidth = s.width ?? 1.8;
      ctx.setLineDash(s.dashed ? [5, 4] : []);
      ctx.beginPath();
      pts.forEach(([t, d], i) => (i ? ctx.lineTo(x(t), y(d)) : ctx.moveTo(x(t), y(d))));
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.lineWidth = 1;

      if (s.minLabel) {
        let min = s.points[0];
        for (const p of s.points) if (p[1] < min[1]) min = p;
        if (!s.minLabelAfterCursor || this.cursor >= min[0]) {
          const mx = x(min[0]), my = y(min[1]);
          ctx.fillStyle = s.color;
          ctx.beginPath(); ctx.arc(mx, my, 3, 0, Math.PI * 2); ctx.fill();
          labels.push({ x: mx, y: my, text: s.minLabel, color: s.color });
        }
      }
    }

    // stack labels upward-left of their points, nudging apart on overlap
    ctx.font = 'bold 10.5px ui-monospace, SF Mono, Menlo, monospace';
    const placed: { x0: number; x1: number; y0: number; y1: number }[] = [];
    labels.sort((p, q) => q.y - p.y);
    for (const l of labels) {
      const w = ctx.measureText(l.text).width;
      const right = l.x > padL + pw * 0.55;
      const x0 = right ? l.x - 8 - w : l.x + 8;
      let ly = Math.min(l.y - 8, padT + ph - 6);
      const hits = (yy: number) => placed.some(b => x0 < b.x1 && x0 + w > b.x0 && yy - 10 < b.y1 && yy + 3 > b.y0);
      while (hits(ly) && ly > padT + 12) ly -= 13;
      placed.push({ x0, x1: x0 + w, y0: ly - 10, y1: ly + 3 });
      ctx.strokeStyle = l.color;
      ctx.globalAlpha = 0.5;
      ctx.beginPath(); ctx.moveTo(l.x, l.y); ctx.lineTo(right ? x0 + w : x0, ly - 3); ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.fillStyle = 'rgba(5,5,16,0.85)';
      ctx.fillRect(x0 - 2, ly - 10, w + 4, 13);
      ctx.fillStyle = l.color;
      ctx.textAlign = 'left';
      ctx.fillText(l.text, x0, ly);
    }
    ctx.font = '10px ui-monospace, SF Mono, Menlo, monospace';

    // cursor
    if (this.cursor >= this.t0 && this.cursor <= this.t1) {
      const cx = x(this.cursor);
      ctx.strokeStyle = 'rgba(255,255,255,0.45)';
      ctx.beginPath(); ctx.moveTo(cx, padT); ctx.lineTo(cx, padT + ph); ctx.stroke();
    }
  }
}

/** Sample a separation function on [t0, t1], forcing in exact minima. */
export function sampleSeparation(
  sep: (t: number) => number,
  t0: number,
  t1: number,
  exactMinima: number[] = [],
  step = 1,
): [number, number][] {
  const ts: number[] = [];
  for (let t = t0; t < t1; t += step) ts.push(t);
  ts.push(t1);
  for (const m of exactMinima) if (m > t0 && m < t1) ts.push(m);
  ts.sort((a, b) => a - b);
  return ts.map(t => [t, sep(t)]);
}
