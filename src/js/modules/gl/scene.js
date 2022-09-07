import Model from "./mod/_model.js";
import Spinner from "./utils/spinner.js";

import { LIB } from "../../../assets/lib";
// import { loadModel } from "./utils/mod-loader.js";

export default class {
  constructor(gl) {
    this.gl = gl;

    this.create();
  }

  create() {
    this.load();

    this.spinner = new Spinner();
  }

  async load() {
    this.model = new Model(this.gl);
    this.model.load(LIB.m0);

    // this.model2 = new Model(this.gl);
    // this.model2.load(LIB.m1);
  }

  render(t, y) {
    this.spinner?.render();

    if (this.model && this.model.shouldRender)
      this.model.render(t, this.spinner.rmat);

    // if (this.model2 && this.model2.shouldRender)
    //   this.model2.render(t, this.spinner.rmat);
  }

  resize(gl) {
    this.gl = gl;

    if (this.model) this.model.resize(this.gl);
    // if (this.model2) this.model2.resize(this.gl);
  }
}
