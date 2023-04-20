import { Component, onCleanup } from 'solid-js'
import * as THREE from 'three'
import {
	scene,
	getWidth,
	getHeight,
	setAnimateCallbacks,
	renderer,
	Callback,
	camera
} from '../../three'

export const Sun: Component = () => {
	const atomosphereCamera = new THREE.OrthographicCamera(
		-getWidth() / 2,
		getWidth() / 2,
		getHeight() / 2,
		-getHeight() / 2,
		1,
		10000
	)

	const atomosphereScene = new THREE.Scene()

	const sunRadius = 500
	const sunGeometry = new THREE.CircleGeometry(sunRadius, 32)
	const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 })
	const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial)

	// Set the sun's position in the scene
	sunMesh.position.set(0, -250, -3000)

	scene.add(sunMesh)

	const sunRender: Callback = () => {
		// sunCamera.position.x = camera.position.x
		// sunCamera.position.y = camera.position.y
		renderer.render(atomosphereCamera, camera) // Render the sunScene
	}
	sunRender._name = 'sunRender'

	setAnimateCallbacks((prev) => [...prev, sunRender])

	onCleanup(() => {
		scene.remove(sunMesh)
		setAnimateCallbacks((prev) => prev.filter((cb) => cb._name !== 'sunRender'))
	})

	return <></>
}
