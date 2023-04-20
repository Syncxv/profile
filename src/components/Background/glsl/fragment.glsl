uniform float edgeThreshold;
uniform vec3 coolPos;
uniform vec3 faceIndices;
uniform float hoveredFaceId;
uniform vec2 divisions;

varying vec3 finalPos;
varying vec3 vPosition;
varying vec3 vBarycentric;
varying vec2 vUv;
varying float vFaceId;

vec3 indexToColor(float index) {
  float normalizedIndex = index / 255.0; // Assuming you have at most 256 faces
  return vec3(normalizedIndex, 0.0, 1.0 - normalizedIndex);
}

void main() {
  vec3 edgeColor = vec3(0.5, .0, .1);
  float cool = vUv.y - (finalPos.z * 0.7);
  vec3 faceColor = mix(vec3(0.2, cool, 0.6), vec3(0.0, 0.4, 0.7), .996);

  float maxBarycentric =
      max(max(vBarycentric.x, vBarycentric.y), vBarycentric.z);
  bool isEdge = (fract(vUv.x * divisions.x) < edgeThreshold) ||
                (fract(vUv.y * divisions.y) < edgeThreshold) ||
                (abs(fract(vUv.x * divisions.x) - fract(vUv.y * divisions.y)) <
                 edgeThreshold);

  float faceIndex = float(
      int((divisions.y - 1.0 - floor(vUv.y * divisions.y)) * divisions.x * 2.0 +
          floor(vUv.x * divisions.x) * 2.0));
  if (fract(vUv.x * divisions.x) > fract(vUv.y * divisions.y)) {
    faceIndex += 1.0;
  }

  // float faceIndex = 2.;

  //   if (!isEdge && vFaceId == hoveredFaceId) {
  //     faceColor = vec3(1.0, 0.0, 0.0);
  //   }

  if (faceIndex == hoveredFaceId) {
    faceColor = faceColor * 1.5;
  }

  //   faceColor = vec3(fract(float(faceId) / 4.0), 0.0, 0.0);

  gl_FragColor = isEdge ? vec4(edgeColor, 1.0) : vec4(faceColor, 1.0);
  //   gl_FragColor = vec4((float(vFaceId)) / 255.0);
}
