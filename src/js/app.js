import Gl from "./modules/gl/gl.js";
import Scroll from "./modules/scroll.js";
import Lenis from "./modules/lenis";

class App {
  constructor() {
    // console.log("App");

    window.evts = {
      clicky: (i = null) => {
        console.log("clicky", i);
      },
    };

    this.time = 0;
    this.init();
  }

  init() {
    // this.scroll = new Scroll();
    this.lenis = new Lenis();
    this.gl = new Gl();

    this.render();
  }

  render() {
    this.time++;
    // this.scroll?.raf();
    this.lenis?.raf(this.time);
    window.requestAnimationFrame(this.render.bind(this));
  }
}

window.App = new App();
