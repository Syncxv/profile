uniform float edgeThreshold;
uniform vec3 coolPos;
uniform vec3 faceIndices;
uniform float hoveredFaceId;

varying float vFaceId;
varying vec3 finalPos;
varying vec3 vPosition;
varying vec3 vBarycentric;
varying vec2 vUv;

void main() {
  vec3 edgeColor = vec3(.0, .0, .1);
  float cool = vUv.y - (finalPos.z * 0.7);
  vec3 faceColor = mix(vec3(cool * 3., 0.5, 1.0), vec3(0.0, 0.0, 1.0), .99);

  float xDiff = abs(vBarycentric.x + floor(vBarycentric.x + 0.5));
  float yDiff = abs(vBarycentric.y + floor(vBarycentric.y + 0.5));
  float zDiff = abs(vBarycentric.z + floor(vBarycentric.z + 0.5));

  bool isEdge =
      xDiff < edgeThreshold || yDiff < edgeThreshold || zDiff < edgeThreshold;

  if (vFaceId == hoveredFaceId) {
    faceColor = vec3(1.0, 0.0, 0.0);
  }
  gl_FragColor = isEdge ? vec4(edgeColor, 1.0) : vec4(faceColor, 1.0);
}
