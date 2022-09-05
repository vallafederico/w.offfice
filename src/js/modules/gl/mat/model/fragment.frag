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

// vec2 st = gl_FragCoord.xy/v_res.xy;

