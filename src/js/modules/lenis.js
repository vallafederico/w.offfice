import Lenis from "@studio-freight/lenis";

export default class {
  constructor() {
    this.lenis = new Lenis({
      duration: 0.1,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // https://easings.net
      smooth: true,
      direction: "vertical",
    });
  }

  raf(time) {
    this.lenis.raf(time);
    // requestAnimationFrame(raf);
  }
}
