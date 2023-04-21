import { Component, onCleanup } from 'solid-js';
import * as THREE from 'three';

import {
	Callback,
	camera,
	scene,
	setAnimateCallbacks
} from '../../three';
import { createBloomComposer } from '../../utils/createBloomComposer';

export const Sun: Component = () => {
	const sunRadius = 350;
	const sunGeometry = new THREE.CircleGeometry(sunRadius, 100);
	const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xff4d4d });
	const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
	sunMesh.layers.set(1);
	sunMesh.position.set(0, -350, -3000);

	scene.add(sunMesh);

	const bloomComposer = createBloomComposer({ strength: 0.5, radius: 1.5 });

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
		scene.remove(aimbientLight);
		setAnimateCallbacks(prev => prev.filter(cb => cb._name !== 'sunRender'));
	});

	return <></>;
};
