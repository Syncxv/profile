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
  vec3 edgeColor = vec3(.0, .0, .1);
  float cool = vUv.y - (finalPos.z * 0.7);
  vec3 faceColor = mix(vec3(cool * 3., 0.5, 1.0), vec3(0.0, 0.0, 1.0), .98);

  float xDiff = abs(vBarycentric.x + floor(vBarycentric.x + 0.5));
  float yDiff = abs(vBarycentric.y + floor(vBarycentric.y + 0.5));
  float zDiff = abs(vBarycentric.z + floor(vBarycentric.z + 0.5));

  bool isEdge =
      xDiff < edgeThreshold || yDiff < edgeThreshold || zDiff < edgeThreshold;

  float faceIndex = float(
      int((divisions.y - 1.0 - floor(vUv.y * divisions.y)) * divisions.x * 2.0 +
          floor(vUv.x * divisions.x) * 2.0));
  if (fract(vUv.x * divisions.x) > fract(vUv.y * divisions.y)) {
    faceIndex += 1.0;
  }

  //   if (!isEdge && vFaceId == hoveredFaceId) {
  //     faceColor = vec3(1.0, 0.0, 0.0);
  //   }

  if (!isEdge && faceIndex == hoveredFaceId) {
    faceColor = indexToColor(faceIndex), 1.0;
  } else {
    faceColor = indexToColor(faceIndex) * 0.5;
  }

  //   faceColor = vec3(fract(float(faceId) / 4.0), 0.0, 0.0);

  gl_FragColor = isEdge ? vec4(edgeColor, 1.0) : vec4(faceColor, 1.0);
  //   gl_FragColor = vec4((float(vFaceId)) / 255.0);
}
