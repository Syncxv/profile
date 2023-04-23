import { Component, onCleanup } from 'solid-js';
import * as THREE from 'three';

import {
	amplitude1,
	amplitude2,
	divisions,
	frequency1,
	frequency2,
	scalingFactor,
	spatialFrequency,
	timeOffset
} from '../../constants';
import { Callback, renderer, scene, setAnimateCallbacks } from '../../three';
import { camera } from '../../three/index';
import fragmentShader from './glsl/fragment.glsl';
import vertexShader from './glsl/vertex.glsl';


export const Plane: Component = () => {
	const clock = new THREE.Clock();
	const material = new THREE.ShaderMaterial({
		// wireframe: true,
		uniforms: {
			// uTexture: { value: new THREE.TextureLoader().load('/debug-texture.jpg') },
			time: { value: 0 },
			edgeThreshold: { value: 0.01 },
			hoveredFaceId: { value: -1000000 },
			divisions: { value: new THREE.Vector2(divisions, divisions) },
			spatialFrequency: { value: spatialFrequency },
			timeOffset: { value: timeOffset },
			frequency1: { value: frequency1 },
			frequency2: { value: frequency2 },
			amplitude1: { value: amplitude1 },
			amplitude2: { value: amplitude2 },
			scalingFactor: { value: scalingFactor }
		},
		vertexShader,
		fragmentShader
	});
	const geometry = new THREE.PlaneGeometry(2000, 2000, divisions, divisions);
	const positionAttribute = geometry.getAttribute('position') as THREE.BufferAttribute;

	const vertex = new THREE.Vector3();

	// const index = geometry.getIndex()

	// thanks ant0n.net
	for (let i = 0; i < positionAttribute.count; i++) {
		vertex.fromBufferAttribute(positionAttribute, i);

		vertex.x += (Math.random() - 0.5) * 4;
		vertex.y += (Math.random() - 0.5) * 5;
		vertex.z += (Math.random() - 0.5) * 70;

		// Update the position attribute with the modified vertex
		positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
	}

	// setBarycentricCoordinates(geometry);

	positionAttribute.needsUpdate = true;
	const plane = new THREE.Mesh(geometry, material);
	// plane.layers.set(2)
	plane.material.depthTest = false;
	plane.renderOrder = 1;
	plane.rotateX(-Math.PI / 2);
	plane.position.set(0, -300, -220);
	scene.add(plane);
	clock.start();

	// const bloomComposer = createBloomComposer({ strength: 0.3, radius: 0.5, threshold: 0.1 })

	// mouse move raycast
	const raycaster = new THREE.Raycaster();
	const mouse = new THREE.Vector2();
	const handleMouseMove = (e: MouseEvent) => {
		mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
		mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
	};

	window.addEventListener('mousemove', handleMouseMove);

	// from vertex shader
	function calculateSurface(x: number, z: number, time: number) {
		const wave1 =
			Math.sin((x * spatialFrequency + (time + timeOffset) * frequency1) * 2.0 * Math.PI) *
			amplitude1;
		const wave2 =
			Math.sin((z * spatialFrequency - (time + timeOffset) * frequency2) * 1.5 * Math.PI) *
			amplitude2;

		return (wave1 + wave2) / scalingFactor;
	}

	const callback: Callback = () => {
		const time = clock.getElapsedTime();
		for (let i = 0; i < positionAttribute.count; i++) {
			vertex.fromBufferAttribute(positionAttribute, i);

			// Calculate the new Z value based on the original X and Y values
			vertex.z = calculateSurface(vertex.y, vertex.x, time) + vertex.z;

			// Update the position attribute with the modified vertex
			positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
		}
		positionAttribute.needsUpdate = true;

		raycaster.setFromCamera(mouse, camera);
		const intersects = raycaster.intersectObjects<THREE.Mesh>([plane]);
		if (intersects.length > 0) {
			const faceIndex = intersects[0].faceIndex!;
			material.uniforms.hoveredFaceId.value = faceIndex;
			// console.log(faceIndex)
		} else {
			material.uniforms.hoveredFaceId.value = -1;
			// console.log('no face')
		}

		material.uniforms.time.value = time;

		// XD
		// camera.layers.set(2)
		// bloomComposer.render()
		// camera.layers.set(0)

		renderer.clearDepth();
	};
	callback._name = 'Background';
	setAnimateCallbacks(prev => [...prev, callback]);

	onCleanup(() => {
		scene.remove(plane);
		window.removeEventListener('mousemove', handleMouseMove);
		setAnimateCallbacks(prev => prev.filter(cb => cb._name !== 'Background'));
	});

	return <></>;
};
