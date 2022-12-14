#define PI 3.1415926538
attribute vec4 position;
attribute vec2 texcoord;
attribute vec3 normal;

uniform mat4 u_camera;
uniform mat4 u_id;
uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_vs;
uniform mat4 u_rmat;
uniform float u_s_prog;


uniform float u_num0;

varying vec2 v_res;
varying float v_time;
varying vec2 v_uv;
varying vec3 v_nor;
varying vec3 v_view;
varying float v_s_prog;



void main() {
  vec4 pos = position;

  pos *= u_rmat;
  pos.xyz *= 1.2 + (u_s_prog) * .2;
  // pos.z += sin(u_time) * 2.;



  gl_Position =  u_camera * u_id * vec4(pos);

  v_view = normalize(- gl_Position.xyz);

  v_res = u_res;
  v_time = u_time;
  v_uv = texcoord;
  v_nor = vec3(vec4(normal, 1.) * u_rmat).xyz;
  v_s_prog = u_s_prog;
}

  
