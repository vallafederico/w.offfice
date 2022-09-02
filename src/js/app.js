import Gl from "./modules/gl/gl";

class App {
  constructor() {
    console.log("App");

    this.init();
  }

  init() {
    this.gl = new Gl();
  }
}

new App();
