import { Component, onMount } from 'solid-js'
import * as THREE from 'three'
import { scene } from '../three'
export const Background: Component = () => {
	onMount(() => {
		//create cube
		const geometry = new THREE.BoxGeometry(1, 1, 1)
		const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
		const cube = new THREE.Mesh(geometry, material)
		scene.add(cube)
	})
	return <div>hu</div>
}
