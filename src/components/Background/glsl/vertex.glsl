uniform float time;
varying vec2 vUv;

float frequency1 = 0.5;
float frequency2 = 0.9;
float amplitude1 = 1.1;
float amplitude2 = 10.3;
float scalingFactor = 5.0;

float calculateSurface(float x, float z) {
  float wave1 = sin((x + time * frequency1) * 2.0 * 3.14159) * amplitude1;
  float wave2 = sin((z - time * frequency2) * 1.5 * 3.14159) * amplitude2;
  return (wave1 + wave2) / scalingFactor;
}

void main() {
  vUv = uv;
  vec3 newPosition = position;
  newPosition.z = calculateSurface(position.x, position.y);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
