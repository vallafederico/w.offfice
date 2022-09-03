import Gl from "./modules/gl/gl";
import Scroll from "./modules/scroll";

class App {
  constructor() {
    console.log("App");

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

new App();
