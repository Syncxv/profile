import { createSignal } from 'solid-js'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export const [animateCallbacks, setAnimateCallbacks] = createSignal([])
export const [resizeCallbacks, setResizeCallbacks] = createSignal([])

//Container stuff
export const container = document.querySelector('.three-container')!

export const getHeight = () => container.getBoundingClientRect().height
export const getWidth = () => container.getBoundingClientRect().width

export const mouse = new THREE.Vector2()
export const scene = new THREE.Scene()
export const clock = new THREE.Clock()

export const camera = new THREE.PerspectiveCamera(36, getWidth() / getHeight(), 0.1, 1000)

export const renderer = new THREE.WebGLRenderer({
	antialias: true,
	alpha: true,
	logarithmicDepthBuffer: true
})

renderer.setPixelRatio(window.devicePixelRatio)

new OrbitControls(camera, renderer.domElement)

document.addEventListener('resize', onResize)

function onResize() {
	resizeCallbacks().forEach((callback) => callback())
	camera.aspect = getWidth() / getHeight()
	camera.updateProjectionMatrix()
	renderer.setSize(getWidth(), getHeight())
}

function animate() {
	animateCallbacks().forEach((callback) => callback())
	requestAnimationFrame(animate)
	renderer.render(scene, camera)
}

export const init = () => {
	animate()
	camera.updateProjectionMatrix()
	camera.position.setZ(4)
	renderer.setSize(getWidth(), getHeight())
	container.appendChild(renderer.domElement)
}
