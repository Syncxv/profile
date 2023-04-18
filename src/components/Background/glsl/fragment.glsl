varying vec2 vUv;
varying float finalPos;
void main() {
  vec3 cool = vec3(vUv - (finalPos * 0.7), 1.);
  vec3 hehe = mix(cool, vec3(0.0, 0.0, 1.0), 0.5);
  gl_FragColor = vec4(hehe * .9, 1.0);
}
