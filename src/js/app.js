import Gl from "./modules/gl/gl.js";
// import Scroll from "./modules/scroll.js";
import Lenis from "./modules/lenis";

class App {
  constructor() {
    // console.log("App");

    window.evts = {
      clicky: (i = null) => {
        // console.log("clicky", i);
      },
    };

    window.ss = {
      vel: 0,
      prog: 0,
    };

    this.time = 0;
    this.init();
    this.lenis = new Lenis();
  }

  init() {
    // this.scroll = new Scroll();

    this.gl = new Gl();

    this.render();
  }

  render() {
    this.time++;
    // this.scroll?.raf();
    this.lenis?.render(this.time);
    window.requestAnimationFrame(this.render.bind(this));
  }
}

window.App = new App();
