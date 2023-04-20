import { Component, onCleanup, onMount } from 'solid-js'
import * as THREE from 'three'
import { Callback, scene, setAnimateCallbacks } from '../../three'
import { camera } from '../../three/index'

import vertexShader from './glsl/vertex.glsl'
import fragmentShader from './glsl/fragment.glsl'
import { setBarycentricCoordinates } from '../../utils/setBarycentricCoordinates'
import {
	spatialFrequency,
	timeOffset,
	frequency1,
	amplitude1,
	frequency2,
	amplitude2,
	scalingFactor,
	divisions
} from '../../constants'

let g_Plane: THREE.Mesh

export const Background: Component = () => {
	const clock = new THREE.Clock()
	const material = new THREE.ShaderMaterial({
		// wireframe: true,
		uniforms: {
			// uTexture: { value: new THREE.TextureLoader().load('/debug-texture.jpg') },
			time: { value: 0 },
			edgeThreshold: { value: 0.01 },
			hoveredFaceId: { value: -1000000 },
			divisions: { value: new THREE.Vector2(divisions, divisions) },
			spatialFrequency: { value: spatialFrequency },
			timeOffset: { value: timeOffset },
			frequency1: { value: frequency1 },
			frequency2: { value: frequency2 },
			amplitude1: { value: amplitude1 },
			amplitude2: { value: amplitude2 },
			scalingFactor: { value: scalingFactor }
		},
		vertexShader: vertexShader,
		fragmentShader
	})
	const geometry = new THREE.PlaneGeometry(1000, 1000, divisions, divisions)
	const positionAttribute = geometry.getAttribute('position') as THREE.BufferAttribute

	const vertex = new THREE.Vector3()

	// const index = geometry.getIndex()

	const numFaces = geometry.index
		? geometry.index.count / 3
		: geometry.getAttribute('position').count / 3
	const faceIndices = new Float32Array(geometry.getAttribute('position').count)
	for (let i = 0; i < numFaces; i++) {
		faceIndices[i * 3] = faceIndices[i * 3 + 1] = faceIndices[i * 3 + 2] = i
	}
	geometry.setAttribute('faceIndex', new THREE.BufferAttribute(faceIndices, 1))

	for (let i = 0; i < positionAttribute.count; i++) {
		vertex.fromBufferAttribute(positionAttribute, i)

		// Apply your randomization logic here, for example:
		vertex.x += (Math.random() - 0.5) * 4
		vertex.y += (Math.random() - 0.5) * 3
		vertex.z += (Math.random() - 0.5) * 90

		// Update the position attribute with the modified vertex
		positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z)
	}

	setBarycentricCoordinates(geometry)

	positionAttribute.needsUpdate = true
	const plane = new THREE.Mesh(geometry, material)
	plane.rotateX(-Math.PI / 2)
	plane.position.set(0, -300, -220)
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

	// from vertex shader
	function calculateSurface(x: number, z: number, time: number) {
		const wave1 =
			Math.sin((x * spatialFrequency + (time + timeOffset) * frequency1) * 2.0 * Math.PI) *
			amplitude1
		const wave2 =
			Math.sin((z * spatialFrequency - (time + timeOffset) * frequency2) * 1.5 * Math.PI) *
			amplitude2

		return (wave1 + wave2) / scalingFactor
	}

	const callback: Callback = () => {
		const time = clock.getElapsedTime()
		for (let i = 0; i < positionAttribute.count; i++) {
			vertex.fromBufferAttribute(positionAttribute, i)

			// Calculate the new Z value based on the original X and Y values
			vertex.z = calculateSurface(vertex.y, vertex.x, time) + vertex.z

			// Update the position attribute with the modified vertex
			positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z)
		}
		positionAttribute.needsUpdate = true

		raycaster.setFromCamera(mouse, camera)
		const intersects = raycaster.intersectObjects<THREE.Mesh>([plane])
		if (intersects.length > 0) {
			const faceIndex = intersects[0].faceIndex!
			material.uniforms.hoveredFaceId.value = faceIndex
			// console.log(faceIndex)
		} else {
			material.uniforms.hoveredFaceId.value = -1
			// console.log('no face')
		}

		material.uniforms.time.value = time
	}
	callback._name = 'Background'
	setAnimateCallbacks((prev) => [...prev, callback])

	onCleanup(() => {
		// clean up code here
		scene.remove(plane)
		window.removeEventListener('mousemove', handleMouseMove)
		setAnimateCallbacks((prev) => prev.filter((cb) => cb._name !== 'Background'))
	})

	return <></>
}
