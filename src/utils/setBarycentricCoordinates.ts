import * as THREE from 'three'

export function setBarycentricCoordinates(geometry: THREE.BufferGeometry) {
	const numTriangles = geometry.getIndex()
		? geometry.getIndex()!.count / 3
		: geometry.getAttribute('position').count / 3
	const barycentric = new Float32Array(numTriangles * 3 * 3)

	for (let i = 0; i < numTriangles; i++) {
		barycentric[i * 9] = 1
		barycentric[i * 9 + 1] = 0
		barycentric[i * 9 + 2] = 0

		barycentric[i * 9 + 3] = 0
		barycentric[i * 9 + 4] = 1
		barycentric[i * 9 + 5] = 0

		barycentric[i * 9 + 6] = 0
		barycentric[i * 9 + 7] = 0
		barycentric[i * 9 + 8] = 1
	}

	geometry.setAttribute('barycentric', new THREE.BufferAttribute(barycentric, 3))
}
