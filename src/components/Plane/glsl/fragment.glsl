#define PREV_FACE_IDS_MAX 10

uniform float edgeThreshold;
uniform float hoveredFaceId;
uniform float previousHoveredFaceIds[PREV_FACE_IDS_MAX];
uniform vec2 divisions;
uniform float time;

varying vec3 finalPos;
varying vec2 vUv;

void main() {
  vec3 edgeColor = vec3(0.5, .0, .1);
  float cool = vUv.x - (finalPos.z * 0.7);
  vec3 faceColor = mix(vec3(cool, 0.0, .0), vec3(0.2, 0.0, 0.9), .996);

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

  // if (faceIndex == hoveredFaceId) {
  //   faceColor = faceColor * 1.5;
  // }

  float opacityFactor = 0.02;

  for (int i = 0; i < PREV_FACE_IDS_MAX; ++i) {
    if (previousHoveredFaceIds[i] == faceIndex) {
      float relI = float(i);
      float opacityAdjustment = (float(PREV_FACE_IDS_MAX - i) * opacityFactor);
      faceColor += (1.0 - faceColor) * opacityAdjustment;
    }
  }

  //   faceColor = vec3(fract(float(faceId) / 4.0), 0.0, 0.0);

  gl_FragColor = isEdge ? vec4(edgeColor, 1.0) : vec4(faceColor, 1.0);
  //   gl_FragColor = vec4((float(vFaceId)) / 255.0);
}
