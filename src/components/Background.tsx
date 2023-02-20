import { Component, onMount } from 'solid-js'
import * as THREE from 'three'
import { scene, setAnimateCallbacks } from '../three'
import { camera } from '../three/index'
export const Background: Component = () => {
	onMount(() => {
		//texture material
		const texture = new THREE.TextureLoader().load('/debug-texture.jpg')
		const material = new THREE.MeshBasicMaterial({
			map: texture,
			side: THREE.DoubleSide
		})
		const plane = new THREE.Mesh(new THREE.PlaneGeometry(500, 500), material)
		plane.rotateX(-Math.PI / 2)
		plane.position.set(0, 0, -1)
		scene.add(plane)

		// setAnimateCallbacks((prev) => [
		// 	...prev,
		// 	() => {
		// 		console.log(camera.rotation)
		// 	}
		// ])
	})
	return <div>hu</div>
}
