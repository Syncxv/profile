import { Component, onMount } from 'solid-js'
import * as THREE from 'three'
import { scene, setAnimateCallbacks } from '../../three'
import { camera } from '../../three/index'

import vertexShader from './glsl/vertex.glsl'
import fragmentShader from './glsl/fragment.glsl'
export const Background: Component = () => {
	onMount(() => {
		const clock = new THREE.Clock()
		const material = new THREE.ShaderMaterial({
			wireframe: true,
			uniforms: {
				uTexture: { value: new THREE.TextureLoader().load('/debug-texture.jpg') },
				time: { value: 0 }
			},
			vertexShader,
			fragmentShader
		})
		const plane = new THREE.Mesh(new THREE.PlaneGeometry(500, 500, 20, 20), material)
		plane.rotateX(-Math.PI / 2)
		plane.position.set(0, 0, -80)
		scene.add(plane)

		clock.start()

		setAnimateCallbacks((prev) => [
			...prev,
			() => {
				console.log('hi', clock.getElapsedTime())
				material.uniforms.time.value = clock.getElapsedTime()
			}
		])
	})
	return <></>
}
