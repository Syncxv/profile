uniform sampler2D uTexture;


varying vec2 vUv;
varying vec3 vNormal;
void main() {
    vec4 image = texture(uTexture, vUv);

    gl_FragColor = image;
}
