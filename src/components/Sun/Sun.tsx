import { Component, onCleanup } from 'solid-js';
import * as THREE from 'three';

import {
	Callback,
	camera,
	scene,
	setAnimateCallbacks
} from '../../three';
import { getBloomComposer } from '../../utils/getBloomComposer';

export const Sun: Component = () => {
	const sunRadius = 500;
	const sunGeometry = new THREE.CircleGeometry(sunRadius, 100);
	const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xff4d4d });
	const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
	sunMesh.layers.set(1);
	// Set the sun's position in the scene
	sunMesh.position.set(0, -250, -3000);

	scene.add(sunMesh);

	const bloomComposer = getBloomComposer({ strength: 0.5, radius: 1.5 });

	const aimbientLight = new THREE.AmbientLight(0xffffff, 0.5);
	scene.add(aimbientLight);

	const sunRender: Callback = () => {
		camera.layers.set(1);
		bloomComposer.render();
		camera.layers.set(0);
	};
	sunRender._name = 'sunRender';

	setAnimateCallbacks(prev => [...prev, sunRender]);

	onCleanup(() => {
		scene.remove(sunMesh);
		setAnimateCallbacks(prev => prev.filter(cb => cb._name !== 'sunRender'));
	});

	return <></>;
};
