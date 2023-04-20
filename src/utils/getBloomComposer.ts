import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { scene, camera, getWidth, getHeight, renderer } from '../three'

export interface BloomComposerOptions {
	strength?: number
	radius?: number
	threshold?: number

	width?: number
	height?: number

	renderToScreen?: boolean

	_scene?: THREE.Scene
}

export function getBloomComposer({
	height,
	width,
	radius,
	strength,
	threshold,
	renderToScreen,
	_scene
}: BloomComposerOptions = {}) {
	const renderScene = new RenderPass(_scene ?? scene, camera)
	const bloomPass = new UnrealBloomPass(
		new THREE.Vector2(width ?? getWidth(), height ?? getHeight()),
		strength ?? 1.5,
		radius ?? 0,
		threshold ?? 0
	)
	// bloomPass.threshold = 0
	// bloomPass.strength = 1.5
	// bloomPass.radius = 0

	const bloomComposer = new EffectComposer(renderer)

	bloomComposer.addPass(renderScene)
	bloomComposer.addPass(bloomPass)
	bloomComposer.renderToScreen = renderToScreen ?? true
	bloomComposer.setSize(width ?? getWidth(), height ?? getHeight())

	return bloomComposer
}
