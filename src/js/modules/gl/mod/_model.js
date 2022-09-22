import {
  createProgramInfo,
  m4,
  setBuffersAndAttributes,
  setUniforms,
  drawBufferInfo,
  createBufferInfoFromArrays,
} from "twgl.js";

import { loadTexture } from "../utils/texture-loader.js";
import { LIB } from "../../../../assets/lib.js";

import Rt from "../post/rendertarget.js";

import shaders from "../mat/model/index.js";
import { loadModel } from "../utils/mod-loader.js";

export default class {
  constructor(gl, config = {}) {
    this.gl = gl;
    // this.config = config;
    this.shouldRender = false;

    this.shaders = shaders;
    this.programInfo = createProgramInfo(this.gl, this.shaders);
    // console.log(this.config);

    this.mat = m4.create();

    this.data = { x: 0, y: 0, z: 0 };
    m4.translation([this.data.x, this.data.y, this.data.z], this.mat);

    this.tr = { x: 1, y: 0, z: 0, w: 0 };

    this.rt = new Rt(this.gl);
  }

  // this to load inside the model
  async load(data) {
    this.matcap = await loadTexture(this.gl, LIB.mat, this.gl.NEAREST);
    const loaded = await loadModel(data);
    this.init(loaded);

    this.rt.resize(this.gl);
    this.rt.isActive = true;
    // console.log(this.rt.texture);
  }

  // else pass arrays straight to init()
  init(arr) {
    this.gl.useProgram(this.programInfo.program);
    this.setBuffAtt(arr);
    this.setUniforms();
    this.shouldRender = true;
    this.isLoaded = true;

    this.initEvents();
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

  render(t, rmat) {
    if (!this.shouldRender) return;

    this.gl.useProgram(this.programInfo.program);
    setBuffersAndAttributes(this.gl, this.programInfo, this.bufferInfo);

    setUniforms(this.programInfo, {
      u_res: [this.gl.canvas.width, this.gl.canvas.height],
      u_vs: this.gl.vp.viewSize,
      u_camera: this.gl.camera.mat,
      u_id: this.mat,
      u_time: t,
      u_rmat: rmat,
      u_matcap: this.matcap,
      u_s_prog: window.ss.prog,
      // u_scale: 1,
    });

    if (this.rt && this.rt.isActive) this.rt.setupRender(); // render to texture

    drawBufferInfo(this.gl, this.bufferInfo);
  }

  resize(gl) {
    if (!this.shouldRender) return;
    this.gl = gl;

    setUniforms(this.programInfo, {
      u_res: [gl.canvas.width, gl.canvas.height],
      u_vs: gl.vp.viewSize,
      u_camera: gl.camera.mat,
      u_matcap: this.matcap,
    });

    if (this.rt) this.rt.resize(this.gl);
  }

  /* --- DOM */
  initEvents() {
    // console.log(this.config.el);
  }
}
