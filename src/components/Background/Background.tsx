import { Component, onMount } from 'solid-js'
import * as THREE from 'three'
import { clock, scene, setAnimateCallbacks } from '../../three'
import { camera } from '../../three/index'

import vertexShader from './glsl/vertex.glsl'
import fragmentShader from './glsl/fragment.glsl'
export const Background: Component = () => {
	onMount(() => {
		const material = new THREE.ShaderMaterial({
			// wireframe: true,
			uniforms: {
				uTexture: { value: new THREE.TextureLoader().load('/debug-texture.jpg') },
				uTime: { value: 0 }
			},
			vertexShader,
			fragmentShader
		})
		const plane = new THREE.Mesh(new THREE.PlaneGeometry(500, 500, 100, 100), material)
		plane.rotateX(-Math.PI / 2)
		plane.position.set(0, 0, -1)
		scene.add(plane)

		setAnimateCallbacks((prev) => [
			...prev,
			() => {
				console.log('hi', clock.getElapsedTime())
				material.uniforms.uTime.value += clock.getElapsedTime()
			}
		])
	})
	return <div>hu</div>
}
