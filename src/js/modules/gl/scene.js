// import Quad from "./mod/_quad";
import Model from "./mod/_model.js";

import { LIB } from "../../../assets/lib";

import { loadModel } from "./utils/mod-loader.js";

export default class {
  constructor(gl) {
    this.gl = gl;

    this.create();
  }

  create() {
    this.load();
  }

  async load() {
    // const model = await loadModel();
    this.model = new Model(this.gl);
    this.model.load(LIB.m0);
    // console.log(model);
  }

  render(t, y) {
    // if (this.quad) this.quad.render(t);
    if (this.model) this.model.render(t);
  }

  resize(gl) {
    this.gl = gl;
    // if (this.quad) this.quad.resize(this.gl);
    if (this.model) this.model.resize(this.gl);
  }
}
