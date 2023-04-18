attribute vec3 barycentric;
uniform float time;
varying vec2 vUv;
varying vec3 finalPos;
varying vec3 vPosition;
varying vec3 vBarycentric;
varying vec3 vNormal;

float frequency1 = 0.5;
float frequency2 = 0.9;
float amplitude1 = 1.1;
float amplitude2 = 10.3;
float scalingFactor = 5.0;
float timeOffset = 2.0;
float spatialFrequency = 1.0;

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
  vPosition = position;
  vBarycentric = barycentric;
  vNormal = normal;
  vec3 newPosition = position;
  newPosition.z = calculateSurface(position.y, position.x) + position.z;
  finalPos = newPosition;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
