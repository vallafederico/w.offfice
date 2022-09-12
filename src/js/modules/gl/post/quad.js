import * as twgl from "twgl.js";
import Tween from "gsap";
import shaders from "./mat/";

import { A } from "../../animation";

export default class {
  constructor(gl, data = {}) {
    this.gl = gl;
    this.data = data;
    this.shaders = shaders;
    this.programInfo = twgl.createProgramInfo(this.gl, this.shaders);

    this.a = {
      trans: 0,
    };

    this.gl.useProgram(this.programInfo.program);
    this.setBuffAtt();
    this.setUniforms();
  }

  setBuffAtt() {
    const arrays = {
      position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
    };
    this.bufferInfo = twgl.createBufferInfoFromArrays(this.gl, arrays);
  }

  setUniforms() {
    this.uniforms = {
      u_res: [this.gl.canvas.width, this.gl.canvas.height],
      u_time: 0,
      u_a_trans: this.a.trans,
      //  u_diff: null
    };

    this.gl.useProgram(this.programInfo.program);
    twgl.setUniforms(this.programInfo, this.uniforms);
  }

  render(time, diff = null, t1, t2) {
    // console.log(t1);
    this.gl.useProgram(this.programInfo.program);
    twgl.setBuffersAndAttributes(this.gl, this.programInfo, this.bufferInfo);
    twgl.setUniforms(this.programInfo, {
      u_time: time,
      u_diff: diff,
      u_t1: t1,
      u_t2: t2,
      u_a_trans: this.a.trans,
    });

    twgl.drawBufferInfo(this.gl, this.bufferInfo);
    // this.gl.LINES
  }

  resize(gl) {
    this.gl = gl;

    this.gl.useProgram(this.programInfo.program);
    twgl.setUniforms(this.programInfo, {
      u_res: [this.gl.canvas.width, this.gl.canvas.height],
    });
  }

  slide({ d }) {
    Tween.to(this.a, {
      trans: 1,
      duration: d,
      ease: "pwoer1.inOut",
      onComplete: () => {
        this.a.trans = 0;
      },
    });
  }

  // hover({ d }) {}
}
