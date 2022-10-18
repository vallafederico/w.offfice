import Lenis from "@studio-freight/lenis";

function lerp(v0, v1, t) {
  return v0 * (1 - t) + v1 * t;
}

export default class {
  constructor() {
    this.lenis = new Lenis({
      duration: 0.1,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // https://easings.net
      smooth: true,
      direction: "vertical",
      smoothTouch: false,
      touchMultiplier: 2,
    });

    this.vel = 0;

    this.lenis.on("scroll", (e) => {
      // console.log(e);
      this.onScroll(e);
    });
  }

  onScroll(e) {
    // console.log(e);
    this.vel = lerp(this.vel, e.velocity, 0.2);

    window.ss.vel = this.vel;
    window.ss.prog = e.progress;

    // window.ss.vel = this.vel;
  }

  raf(time) {
    this.lenis.raf(time);
    // requestAnimationFrame(raf);
  }
}
