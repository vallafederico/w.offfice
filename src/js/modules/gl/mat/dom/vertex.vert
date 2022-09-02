#define PI 3.1415926538
attribute vec4 position;
attribute vec2 texcoord;

uniform mat4 u_camera;
uniform mat4 u_id;
uniform float u_y;
uniform vec2 u_scale;

uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_vs;
  uniform vec2 u_ratio;


varying vec2 v_res;
varying float v_time;
varying vec2 v_uv;


void main() {
  vec4 pos = position;
  pos.xy *= u_scale;
  pos.y += u_y;
  


  gl_Position =  u_camera * u_id * vec4(pos);

  v_res = u_res;
  v_time = u_time;

  vec2 new_uv = texcoord;
  new_uv -= vec2(.5);
  new_uv *= u_ratio;
  new_uv += vec2(.5);
  v_uv = new_uv;


}

  
