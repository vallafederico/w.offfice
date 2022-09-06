precision mediump float;

uniform vec2 u_res;
uniform float u_time;

uniform sampler2D u_diff;

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;

  vec2 n_uv = uv;
  vec4 img = texture2D(u_diff, n_uv);

  // img.rg += uv;
  // img.a += uv.x * .2;

  gl_FragColor.rgb = img.rgb;
  gl_FragColor.a = img.a;
}
  