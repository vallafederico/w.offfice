import {
  createProgramInfo,
  m4,
  setBuffersAndAttributes,
  setUniforms,
  drawBufferInfo,
  createBufferInfoFromArrays,
} from "twgl.js";

import shaders from "../mat/model/index.js";
import { loadModel } from "../utils/mod-loader.js";

export default class {
  constructor(gl, data = { x: 0, y: 0, z: 0 }) {
    this.gl = gl;
    this.data = data;
    this.shouldRender = false;
    this.shaders = shaders;
    this.programInfo = createProgramInfo(this.gl, this.shaders);

    this.mat = m4.create();
    m4.translation([this.data.x, this.data.y, this.data.z], this.mat);

    this.tr = { x: 1, y: 0, z: 0, w: 0 };
  }

  // this to load inside the model
  async load(data) {
    const loaded = await loadModel(data);
    console.log(loaded);
    this.init(loaded);
  }

  // else pass arrays straight to init()
  init(arr) {
    this.gl.useProgram(this.programInfo.program);
    this.setBuffAtt(arr);
    this.setUniforms();
    this.shouldRender = true;
  }

  setBuffAtt(arr) {
    this.bufferInfo = createBufferInfoFromArrays(this.gl, arr);
    setBuffersAndAttributes(this.gl, this.programInfo, this.bufferInfo);
  }

  setUniforms() {
    this.uniforms = {
      u_res: [this.gl.canvas.width, this.gl.canvas.height],
      u_vs: this.gl.vp.viewSize,
      u_camera: this.gl.camera.mat,
      u_id: this.mat,
    };

    this.gl.useProgram(this.programInfo.program);
    setUniforms(this.programInfo, this.uniforms);
  }

  render(t) {
    if (!this.shouldRender) return;

    this.gl.useProgram(this.programInfo.program);
    setBuffersAndAttributes(this.gl, this.programInfo, this.bufferInfo);

    setUniforms(this.programInfo, {
      u_res: [this.gl.canvas.width, this.gl.canvas.height],
      u_vs: this.gl.vp.viewSize,
      u_camera: this.gl.camera.mat,
      u_time: t,
    });

    drawBufferInfo(this.gl, this.bufferInfo);
  }

  resize(gl) {
    this.gl = gl;
    setUniforms(this.programInfo, {
      u_res: [gl.canvas.width, gl.canvas.height],
      u_vs: gl.vp.viewSize,
      u_camera: gl.camera.mat,
    });
  }
}
