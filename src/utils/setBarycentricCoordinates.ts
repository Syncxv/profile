import * as THREE from 'three'

export function setBarycentricCoordinates(geometry: THREE.BufferGeometry) {
	const positionAttribute = geometry.getAttribute('position')
	const barycentricAttribute = new THREE.Float32BufferAttribute(positionAttribute.count * 3, 3)
	geometry.setAttribute('barycentric', barycentricAttribute)

	for (let i = 0; i < positionAttribute.count; i += 3) {
		barycentricAttribute.setXYZ(i, 1, 0, 0)
		barycentricAttribute.setXYZ(i + 1, 0, 1, 0)
		barycentricAttribute.setXYZ(i + 2, 0, 0, 1)
	}
}
