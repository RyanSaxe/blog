/* One critically damped spring, solved exactly so any frame time gives the same pose. */
export class Spring {
  x: number;
  v = 0;
  w: number;
  eps: number;
  done = true;
  target: number;
  x0 = 0;
  v0 = 0;
  t0 = 0;
  constructor(x: number, omega = 21, eps = 1e-3) {
    this.x = this.target = x;
    this.w = omega;
    this.eps = eps;
  }
  to(target: number, now: number, v0?: number) {
    if (!this.done) this.sample(now);
    else if (v0 == null) this.v = 0;
    if (v0 != null) this.v = v0;
    this.x0 = this.x;
    this.v0 = this.v;
    this.t0 = now;
    this.target = target;
    this.done = false;
  }
  jump(x: number) {
    this.x = this.target = x;
    this.v = 0;
    this.done = true;
  }
  sample(now: number) {
    if (this.done) return;
    const t = Math.max(0, now - this.t0) / 1000,
      w = this.w;
    const c1 = this.x0 - this.target,
      c2 = this.v0 + w * c1,
      e = Math.exp(-w * t);
    this.x = this.target + (c1 + c2 * t) * e;
    this.v = (c2 - w * (c1 + c2 * t)) * e;
    if (
      Math.abs(this.x - this.target) < this.eps &&
      Math.abs(this.v) < this.eps * 20
    ) {
      this.x = this.target;
      this.v = 0;
      this.done = true;
    }
  }
}
// The site's motion: settles in about 550 ms with no overshoot.
export const OMEGA = 13;
