uniform float edgeThreshold;
varying vec3 vPosition;

void main() {
  vec3 edgeColor = vec3(0.0, 0.0, 0.0);
  vec3 faceColor = vec3(1.0, 1.0, 1.0);

  float xDiff = abs(vPosition.x - floor(vPosition.x + 0.5));
  float yDiff = abs(vPosition.y - floor(vPosition.y + 0.5));
  float zDiff = abs(vPosition.z - floor(vPosition.z + 0.5));

  bool isEdge =
      xDiff < edgeThreshold || yDiff < edgeThreshold || zDiff < edgeThreshold;

  gl_FragColor = isEdge ? vec4(edgeColor, 1.0) : vec4(faceColor, 0.0);
}
