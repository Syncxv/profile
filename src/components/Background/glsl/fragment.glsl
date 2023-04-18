varying vec2 vUv;
varying float finalPos;
void main() {
  gl_FragColor = vec4(finalPos * 0.2, vUv - (finalPos + 0.5), 1.0);
}
