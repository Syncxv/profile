import { Component, onCleanup, onMount } from 'solid-js'
import * as THREE from 'three'
import { scene, setAnimateCallbacks } from '../../three'
import { camera } from '../../three/index'

import vertexShader from './glsl/vertex.glsl'
import fragmentShader from './glsl/fragment.glsl'
import { setBarycentricCoordinates } from '../../utils/setBarycentricCoordinates'

let g_Plane: THREE.Mesh
export const Background: Component = () => {
	onMount(() => {
		const clock = new THREE.Clock()
		const material = new THREE.ShaderMaterial({
			// wireframe: true,
			uniforms: {
				uTexture: { value: new THREE.TextureLoader().load('/debug-texture.jpg') },
				time: { value: 0 },
				edgeThreshold: { value: 0.01 },
				faceIndices: { value: new THREE.Vector3(-1, -1, -1) },
				hoveredFaceId: { value: -1000000 }
			},
			vertexShader: vertexShader,
			fragmentShader
		})
		const geometry = new THREE.PlaneGeometry(1000, 1000, 10, 10)
		const positionAttribute = geometry.getAttribute('position') as THREE.BufferAttribute
		const vertex = new THREE.Vector3()

		const faceIds = []

		for (let i = 0; i < (geometry.attributes.position.count / 3) * 2; i++) {
			faceIds.push(i, i, i)
		}

		geometry.setAttribute('faceId', new THREE.BufferAttribute(new Uint32Array(faceIds), 2))

		for (let i = 0; i < positionAttribute.count; i++) {
			vertex.fromBufferAttribute(positionAttribute, i)

			// Apply your randomization logic here, for example:
			vertex.x += (Math.random() - 0.5) * 4
			vertex.y += (Math.random() - 0.5) * 3
			vertex.z += (Math.random() - 0.5) * 24

			// Update the position attribute with the modified vertex
			positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z)
		}

		setBarycentricCoordinates(geometry)

		positionAttribute.needsUpdate = true
		const plane = new THREE.Mesh(geometry, material)
		plane.rotateX(-Math.PI / 2)
		plane.position.set(0, 0, -220)
		g_Plane = plane
		scene.add(plane)

		clock.start()

		// mouse move raycast
		const raycaster = new THREE.Raycaster()
		const mouse = new THREE.Vector2()
		const handleMouseMove = (e: MouseEvent) => {
			mouse.x = (e.clientX / window.innerWidth) * 2 - 1
			mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
		}

		window.addEventListener('mousemove', handleMouseMove)

		setAnimateCallbacks((prev) => [
			...prev,
			() => {
				raycaster.setFromCamera(mouse, camera)
				const intersects = raycaster.intersectObject<THREE.Mesh>(plane)
				if (intersects.length > 0) {
					const faceIndex = intersects[0].faceIndex!
					material.uniforms.hoveredFaceId.value = faceIndex
					console.log(faceIndex)
				} else {
					material.uniforms.hoveredFaceId.value = -1
					console.log('no face')
				}

				material.uniforms.time.value = clock.getElapsedTime()
			}
		])
	})

	onCleanup(() => {
		// clean up code here
		scene.remove(g_Plane)
	})

	return <></>
}
