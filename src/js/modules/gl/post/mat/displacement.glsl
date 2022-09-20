float displacement(in vec2 uv, in float multiplier) {
  float displacementX = uv.x;
  float j = 1.0;

  const float size = 1.0 / 5.0;

  for (float i = 0.0; i <= 1.0; i += size) {
    j -= 1.0 / 5.0;

    float offset = 0.5 * j * multiplier;

    if (uv.x >= i && uv.x <= i + size) {
      displacementX += offset;
    }
  }

  return displacementX;
}