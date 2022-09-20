#define MTAU 6.28318530718
precision mediump float;

uniform vec2 u_res;
uniform float u_time;

uniform float u_a_trans;

uniform sampler2D u_diff;
uniform sampler2D u_t1;
uniform sampler2D u_t2;

#include noise;
#include displacement;


void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float ns = snoise(vec3(uv * 8.1 , u_time * .2));

  float cent_grad = distance(vec2(.5), uv);
  cent_grad = smoothstep(.1, .3, cent_grad);

  // vec2 n_uv = uv + (uv * ns * .2 * cent_grad) * .05;
  vec2 n_uv = uv;


  // >>>> mixing
  float _disp = (cos(u_a_trans * 1. / (1.0 / 3.141592)) + 1.0) / 2.0;
  float _power = .07;

  vec2 uv1 = vec2(
    n_uv.x - (1.0 - _disp) * (cos(ns * 6.) * _power), 
    n_uv.y - (1.0 - _disp) * (sin(ns * 8.) * _power)
  );

  vec2 uv2 = vec2(
    n_uv.x + _disp * (cos(ns * 6.) * _power), 
    n_uv.y + _disp * (sin(ns * 8.) * _power)
  );



  // mix
  vec4 img1 = texture2D(u_t1, uv1);
  vec4 img2 = texture2D(u_t2, uv2);
  
  vec4 img = mix(img2, img1, _disp);
  




  gl_FragColor.rgb = img.rgb * img.a;
  gl_FragColor.a = img.a;

  // gl_FragColor.rgb = vec3(_disp);
  // gl_FragColor.a = 1.;
}
  



  // static noise
  // img -= snoise(vec3(
  //   uv.x * 800.,
  //   uv.y * 800., 
  //   u_time * 10.
  // )) * .03;

  // clear alpha when not on imag
  // img.a = step(.2, img.a);