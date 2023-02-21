import * as THREE from 'three'

import studio from '@theatre/studio'
import '@theatre/core'
import { getProject, types } from '@theatre/core'
import { camera } from './index'
import state from './cool-state.json'

console.log(state)

export const project = getProject('THREE.js x Theatre.js', { state: state })
export const sheet = project.sheet('Animated scene')
export const initTheater = (shouldRenderStudio: boolean) => {
	if (!shouldRenderStudio) return
	studio.initialize()

	const cameraObj = sheet.object('Camera', {
		rotation: types.compound({
			x: types.number(camera.rotation.x, { range: [-2, 2] }),
			y: types.number(camera.rotation.y, { range: [-2, 2] }),
			z: types.number(camera.rotation.z, { range: [-2, 2] })
		}),
		position: types.compound({
			x: types.number(camera.position.x, { range: [-1000, 1000] }),
			y: types.number(camera.position.y, { range: [-1000, 1000] }),
			z: types.number(camera.position.z, { range: [-1000, 1000] })
		})
	})

	cameraObj.onValuesChange((values) => {
		const { x, y, z } = values.rotation
		const { x: x2, y: y2, z: z2 } = values.position

		camera.rotation.set(x * Math.PI, y * Math.PI, z * Math.PI)
		camera.position.set(x2, y2, z2)
	})
}
