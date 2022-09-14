#define MTAU 6.28318530718
precision mediump float;

uniform vec2 u_res;
uniform float u_time;

uniform float u_a_trans;

uniform sampler2D u_diff;
uniform sampler2D u_t1;
uniform sampler2D u_t2;

#include noise;


void main() {
  float OSC = sin(MTAU * u_a_trans);

  vec2 uv = gl_FragCoord.xy / u_res;

  float ns = snoise(vec3(uv * 8.1 , u_time * .2));

  float cent_grad = distance(vec2(.5), uv);
  cent_grad = smoothstep(.1, .3, cent_grad);

  vec2 n_uv = uv + (uv * ns * .2 * cent_grad) * .05;

  // imgs
  float _disp = (cos(u_a_trans * 1. / (1.0 / 3.141592)) + 1.0) / 2.0;
  float _power = .1;

  vec2 uv1 = vec2(
    n_uv.x - (1.0 - _disp) * (cos(ns * 6.) * _power), 
    n_uv.y - (1.0 - _disp) * (sin(ns * 8.) * _power)
  );

  vec2 uv2 = vec2(
    n_uv.x + _disp * (cos(ns * 6.) * _power), 
    n_uv.y + _disp * (sin(ns * 8.) * _power)
  );

  vec4 img1 = texture2D(u_t1, uv1);
  vec4 img2 = texture2D(u_t2, uv2);

  float dst = distance(img1.r, img2.r);

  vec4 img = mix(img2, img1, _disp);

  // static noise
  img -= snoise(vec3(
    uv.x * 800.,
    uv.y * 800., 
    u_time * 10.
  )) * .03;

  // clear alpha when not on imag
  // img.a = step(.2, img.a);


  gl_FragColor.rgb = img.rgb;
  // gl_FragColor.rgb = vec3(cent_grad);
  gl_FragColor.a = img.a;
}
  

  /***
  
  
  float displacementFactor = (cos(u_a_trans / (60.0 / 3.141592)) + 1.0) / 2.0;
  float effectFactor = 1.0;
  
  vec2 uv1 = vec2(uv.x - (1.0 - displacementFactor) * (displacementTexture.r * effectFactor), uv.y);
  vec2 uv2 = vec2(uv.x + displacementFactor * (displacementTexture.r * effectFactor), uv.y);

  
  */

  /*
  // imgs
    vec4 img1 = texture2D(u_t1, vec2(
    uv.x + (uv.x * ns) * OSC * .1, 
    uv.y - (uv.y * ns) * OSC * .1
  ));
  
  vec4 img2 = texture2D(u_t2, vec2(
    uv.x - (uv.x * ns) * OSC * .1, 
    uv.y + (uv.y * ns) * OSC * .1
  ));
  
  vec4 img = mix(img1, img2, u_a_trans);
  */