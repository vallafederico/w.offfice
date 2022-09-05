import {
  createProgramInfo,
  m4,
  setBuffersAndAttributes,
  setUniforms,
  drawBufferInfo,
  createBufferInfoFromArrays,
} from "twgl.js";

// import shaders from "../mat/model/index.js";
import { loadModel } from "../utils/mod-loader.js";

const shaders = [
  `
#define PI 3.1415926538
attribute vec4 position;
attribute vec2 texcoord;
attribute vec3 normal;

uniform mat4 u_camera;
uniform mat4 u_id;
uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_vs;

uniform float u_num0;

varying vec2 v_res;
varying float v_time;
varying vec2 v_uv;
varying vec3 v_nor;

// rotation
mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    
    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                0.0,                                0.0,                                0.0,                                1.0);
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
	mat4 m = rotationMatrix(axis, angle);
	return (m * vec4(v, 1.0)).xyz;
}


void main() {
  vec4 pos = position;
  //pos.xy *= u_vs;

  pos.xyz = rotate(pos.xyz, vec3(1., 1., 0.), (u_time * .2));
  pos.xyz *= .07;


  gl_Position =  u_camera * u_id * vec4(pos);

  v_res = u_res;
  v_time = u_time;
  v_uv = texcoord;
  v_nor = normal;
}

  

`,
  `
precision mediump float;

uniform sampler2D u_diff;

varying vec2 v_res;
varying float v_time;
varying vec2 v_uv;
varying vec3 v_nor;



void main() {


    gl_FragColor.rgb = vec3(v_nor);
    gl_FragColor.a = 1.;
}

`,
];

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
