precision mediump float;

uniform sampler2D u_diff;
uniform sampler2D u_matcap;

varying vec2 v_res;
varying float v_time;
varying vec2 v_uv;
varying vec3 v_nor;
varying vec3 v_view;
varying float v_s_prog;


const vec3 col_red = vec3(.85098039215686275, 0.15098039215686275, 0.15098039215686275);
const vec3 col_grey1 = vec3(.45098039215686275);
const vec3 col_grey2 = vec3(.0098039215686275);

// fresnel
float fresnelFunc(vec3 viewDirection, vec3 v_normal) {
	return pow( 1.0 + dot(viewDirection, v_normal), 3.0 );
}


void main() {

    // matcap
    vec3 x = normalize( vec3(v_view.z, 0., -v_view.x));
    vec3 y = cross(v_view, x);
    vec2 fakeUv = vec2(dot(x, v_nor), dot(y, v_nor)) * .495 + .5;
    vec3 mtc = texture2D(u_matcap, fakeUv).rgb;

    float fres = fresnelFunc(v_view, v_nor);

    // * hemi
    vec3 h_sky = vec3(1., 1., 1.);
    vec3 h_ground = vec3(.1, .1, .1);
    vec3 h_dir = normalize(vec3(1., -1., 2.));
    vec3 hlight = mix(h_ground, h_sky, 1. - dot(h_dir, v_nor));

    // * color
    vec3 final = mtc.rrr * .5 - fres * .2;
    final += hlight * .3;
    

    gl_FragColor.rgb = final;
    // gl_FragColor.rgb = vec3(fres);
    gl_FragColor.a = 1.;
}

// vec2 st = gl_FragCoord.xy/v_res.xy;

