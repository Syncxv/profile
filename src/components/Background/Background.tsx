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
			// wireframe: true,
			uniforms: {
				uTexture: { value: new THREE.TextureLoader().load('/debug-texture.jpg') },
				time: { value: 0 }
			},
			vertexShader,
			fragmentShader
		})
		const geometry = new THREE.PlaneGeometry(1000, 1000, 20, 20)
		const positionAttribute = geometry.getAttribute('position') as THREE.BufferAttribute
		const vertex = new THREE.Vector3()

		for (let i = 0; i < positionAttribute.count; i++) {
			vertex.fromBufferAttribute(positionAttribute, i)

			// Apply your randomization logic here, for example:
			vertex.x += (Math.random() - 0.5) * 4
			vertex.y += (Math.random() - 0.5) * 4
			vertex.z += (Math.random() - 0.5) * 4

			// Update the position attribute with the modified vertex
			positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z)
		}

		positionAttribute.needsUpdate = true
		const plane = new THREE.Mesh(geometry, material)
		plane.rotateX(-Math.PI / 2)
		plane.position.set(0, 0, -220)
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
