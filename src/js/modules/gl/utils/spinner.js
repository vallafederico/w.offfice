import { m4 } from "twgl.js";

export default class Spinner {
  constructor() {
    this.spin = { x: 0, y: 0 };
    // main
    this.velocity = { x: 0.005, y: 0.005 };
    this.pointerDown = false;
    this.pointer = {
      x: 0,
      y: 0,
    };

    this.rmat = m4.translation([0, 0, 0]);

    this.addEvents();
  }

  addEvents() {
    if ("ontouchmove" in window) {
      window.addEventListener("touchstart", this.mouseDown.bind(this));
      window.addEventListener("touchmove", this.mouseMove.bind(this));
      window.addEventListener("touchend", this.mouseUp.bind(this));
    } else {
      window.addEventListener("mousedown", this.mouseDown.bind(this));
      window.addEventListener("mousemove", this.mouseMove.bind(this));
      window.addEventListener("mouseup", this.mouseUp.bind(this));
    }
  }

  mouseDown(e) {
    this.pointerDown = true;
    this.pointer.x = e.touches ? e.touches[0].clientX : e.clientX;
    this.pointer.y = e.touches ? e.touches[0].clientY : e.clientY;
  }

  mouseMove(e) {
    // mult
    let mult = 0.00005;
    if (this.pointerDown) mult = 0.0004;

    // compute
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    this.velocity.x += (x - this.pointer.x) * mult;
    this.velocity.y += (y - this.pointer.y) * mult;

    this.pointer.x = x;
    this.pointer.y = y;
  }

  mouseUp() {
    this.pointerDown = false;
  }

  render() {
    // raf
    this.velocity.x *= 0.9;
    this.velocity.y *= 0.9;

    this.spin.x +=
      this.velocity.x +
      Math.sign(this.velocity.x) * 0.0025 * (0.4 - Number(this.pointerDown));
    this.spin.y +=
      this.velocity.y +
      Math.sign(this.velocity.y) * 0.0025 * (0.4 - Number(this.pointerDown));

    const mx = m4.axisRotation([1, 0, 0], this.spin.y);
    const my = m4.axisRotation([0, 1, 0], this.spin.x);
    m4.multiply(mx, my, this.rmat);
  }
}
