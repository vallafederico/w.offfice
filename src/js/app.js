import Gl from "./modules/gl/gl.js";
import Scroll from "./modules/scroll.js";

class App {
  constructor() {
    // console.log("App");

    this.init();
  }

  init() {
    this.scroll = new Scroll();
    this.gl = new Gl();

    this.render();
  }

  render() {
    this.scroll?.raf();
    window.requestAnimationFrame(this.render.bind(this));
  }
}

window.App = new App();
