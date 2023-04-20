uniform float edgeThreshold;
uniform float hoveredFaceId;
uniform vec2 divisions;

varying vec3 finalPos;
varying vec2 vUv;

void main() {
  vec3 edgeColor = vec3(0.5, .0, .1);
  float cool = vUv.y - (finalPos.z * 0.7);
  vec3 faceColor = mix(vec3(0.5, cool, 0.6), vec3(0.3, 0.4, 0.7), .996);

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
