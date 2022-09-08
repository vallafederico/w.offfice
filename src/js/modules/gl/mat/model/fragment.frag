precision mediump float;

uniform sampler2D u_diff;

varying vec2 v_res;
varying float v_time;
varying vec2 v_uv;
varying vec3 v_nor;



void main() {

    // * hemi
    vec3 h_sky = vec3(1., 1., 1.);
    vec3 h_ground = vec3(.1, .1, .1);
    vec3 h_dir = normalize(vec3(1., -2., 4.));
    vec3 hlight = mix(h_ground, h_sky, 1. - dot(h_dir, v_nor));

    vec3 final = vec3(0.45098039215686275, 0.45098039215686275, 0.45098039215686275);
    final += hlight * .2;


    gl_FragColor.rgb = final;
    gl_FragColor.a = 1.;
}

// vec2 st = gl_FragCoord.xy/v_res.xy;

