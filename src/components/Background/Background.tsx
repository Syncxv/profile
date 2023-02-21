import { Component, onMount } from 'solid-js'
import * as THREE from 'three'
import { scene } from '../../three'
import { camera } from '../../three/index'

import vertexShader from './glsl/vertex.glsl'
import fragmentShader from './glsl/fragment.glsl'
export const Background: Component = () => {
	onMount(() => {
		//texture material
		const material = new THREE.ShaderMaterial({
			uniforms: {
				uTexture: { value: new THREE.TextureLoader().load('/debug-texture.jpg') }
			},
			vertexShader,
			fragmentShader
		})
		const plane = new THREE.Mesh(new THREE.PlaneGeometry(500, 500), material)
		plane.rotateX(-Math.PI / 2)
		plane.position.set(0, 0, -1)
		scene.add(plane)
	})
	return <div>hu</div>
}
