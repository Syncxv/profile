varying vec2 vUv;
varying vec3 vNormal;
varying vec2 vSize;
void main() {

    vNormal = normal;
    vUv = uv;


    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
