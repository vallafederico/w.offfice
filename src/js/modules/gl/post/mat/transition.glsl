
// 1. - fluid MIX

// float _disp = (cos(u_a_trans * 1. / (1.0 / 3.141592)) + 1.0) / 2.0;
// float _power = .1;

// vec2 uv1 = vec2(
//   n_uv.x - (1.0 - _disp) * (cos(ns * 6.) * _power), 
//   n_uv.y - (1.0 - _disp) * (sin(ns * 8.) * _power)
// );

// vec2 uv2 = vec2(
//   n_uv.x + _disp * (cos(ns * 6.) * _power), 
//   n_uv.y + _disp * (sin(ns * 8.) * _power)
// );



// 2. - lines MIX

// float _disp = (cos(u_a_trans * 1. / (1.0 / 3.141592)) + 1.0) / 2.0;
// float _power = 1.;

// float _lines = displacement(uv * 20., _disp * OSC);

// vec2 uv1 = vec2(
//   n_uv.x - (1.0 - _disp) * (sin(_lines)  * _power), 
//   n_uv.y - (1.0 - _disp) * (cos(_lines) * _power)
// );

// vec2 uv2 = vec2(
//   n_uv.x + _disp * (sin(_lines) * _power), 
//   n_uv.y + _disp * (cos(_lines) * _power)
// );






///////// mixxxx
// mix
// vec4 img1 = texture2D(u_t1, uv1);
// vec4 img2 = texture2D(u_t2, uv2);
// vec4 img = mix(img2, img1, _disp);