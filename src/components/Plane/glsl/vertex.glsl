uniform float time;

varying vec2 vUv;
varying vec3 finalPos;

uniform float frequency1;
uniform float frequency2;
uniform float amplitude1;
uniform float amplitude2;
uniform float scalingFactor;
uniform float timeOffset;
uniform float spatialFrequency;

float calculateSurface(float x, float z) {
  float wave1 = sin((x * spatialFrequency + (time + timeOffset) * frequency1) *
                    2.0 * 3.14159) *
                amplitude1;
  float wave2 = sin((z * spatialFrequency - (time + timeOffset) * frequency2) *
                    1.5 * 3.14159) *
                amplitude2;
  return (wave1 + wave2) / scalingFactor;
}

void main() {
  vUv = uv;
  vec3 newPosition = position;
  newPosition.z = calculateSurface(position.y, position.x) + position.z;
  finalPos = newPosition;
  // we are not using finalPos because we are doing it in js on the cpu but
  // the fragment shader needs it XD
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
