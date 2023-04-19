import { createSignal } from 'solid-js'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export const [animateCallbacks, setAnimateCallbacks] = createSignal<(() => void)[]>([])
export const [resizeCallbacks, setResizeCallbacks] = createSignal<(() => void)[]>([])

//Container stuff
export const container = document.querySelector('.three-container')!

export const getHeight = () => container.getBoundingClientRect().height
export const getWidth = () => container.getBoundingClientRect().width

export const mouse = new THREE.Vector2()
export const scene = new THREE.Scene()
export const clock = new THREE.Clock()

export const camera = new THREE.PerspectiveCamera(36, getWidth() / getHeight(), 0.1, 10000)

export const renderer = new THREE.WebGLRenderer({
	antialias: true,
	alpha: true,
	logarithmicDepthBuffer: true
})

renderer.setPixelRatio(window.devicePixelRatio * 1.5)

new OrbitControls(camera, renderer.domElement)

document.addEventListener('resize', onResize)

function onResize() {
	resizeCallbacks().forEach((callback) => callback())
	camera.aspect = getWidth() / getHeight()
	camera.updateProjectionMatrix()
	renderer.setSize(getWidth(), getHeight())
}

function animate() {
	renderer.render(scene, camera)
	animateCallbacks().forEach((callback) => callback())
	requestAnimationFrame(animate)
}

export const init = () => {
	clock.start()
	animate()
	camera.updateProjectionMatrix()
	camera.position.set(0, 185, 0)
	renderer.setSize(getWidth(), getHeight())
	container.appendChild(renderer.domElement)
}
