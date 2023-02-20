import { Component, onMount } from 'solid-js'
import * as THREE from 'three'
import { scene, setAnimateCallbacks } from '../three'
import { camera } from '../three/index'
export const Background: Component = () => {
	onMount(() => {
		//create plane mesh
		const plane = new THREE.Mesh(
			new THREE.PlaneGeometry(100, 100),
			new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.DoubleSide })
		)
		plane.rotateX(-Math.PI / 2)
		plane.position.set(0, 0, -1)
		scene.add(plane)

		setAnimateCallbacks((prev) => [
			...prev,
			() => {
				console.log(camera.position)
			}
		])
	})
	return <div>hu</div>
}
