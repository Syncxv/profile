import { createSignal } from 'solid-js';
import * as THREE from 'three';

export type Callback = (() => void) & { [key: string]: any; };

export const [animateCallbacks, setAnimateCallbacks] = createSignal<Callback[]>([]);
export const [resizeCallbacks, setResizeCallbacks] = createSignal<Callback[]>([]);

// Container stuff
export const container = document.querySelector('.three-container')!;

export const getHeight = () => container.getBoundingClientRect().height;
export const getWidth = () => container.getBoundingClientRect().width;

export const mouse = new THREE.Vector2();
export const scene = new THREE.Scene();
export const clock = new THREE.Clock();

export const camera = new THREE.PerspectiveCamera(36, getWidth() / getHeight(), 0.1, 10000);

export const renderer = new THREE.WebGLRenderer({
	antialias: true,
	alpha: true,
	logarithmicDepthBuffer: true
});
renderer.autoClear = false;

renderer.setPixelRatio(window.devicePixelRatio * 1.5);
if (import.meta.env.DEV) {
	import('three/examples/jsm/controls/OrbitControls.js').then(({ OrbitControls }) => {
		new OrbitControls(camera, renderer.domElement);
	});
}
window.addEventListener('resize', onResize);

function onResize() {
	resizeCallbacks().forEach(callback => callback());
	camera.aspect = getWidth() / getHeight();
	camera.updateProjectionMatrix();
	renderer.setSize(getWidth(), getHeight());
}

function animate() {
	renderer.clear();
	animateCallbacks().forEach(callback => callback());
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}

export const init = () => {
	clock.start();
	animate();
	camera.updateProjectionMatrix();
	camera.position.set(0, 185, 0);
	renderer.setSize(getWidth(), getHeight());
	container.appendChild(renderer.domElement);
};
