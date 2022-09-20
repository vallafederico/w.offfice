precision mediump float;

uniform sampler2D u_diff;

varying vec2 v_res;
varying float v_time;
varying vec2 v_uv;
varying vec3 v_nor;

const vec3 col_red = vec3(.85098039215686275, 0.15098039215686275, 0.15098039215686275);
const vec3 col_grey1 = vec3(.25098039215686275);




void main() {

    // * hemi
    vec3 h_sky = vec3(1., 1., 1.);
    vec3 h_ground = vec3(.1, .1, .1);
    vec3 h_dir = normalize(vec3(1., -1., 2.));
    vec3 hlight = mix(h_ground, h_sky, 1. - dot(h_dir, v_nor));

    // * color
    vec3 final = col_grey1;

    final += hlight * .25;
    // final *= hlight + .1;


    gl_FragColor.rgb = final;
    gl_FragColor.a = 1.;
}

// vec2 st = gl_FragCoord.xy/v_res.xy;

