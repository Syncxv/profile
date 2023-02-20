import type { Component } from 'solid-js'
import { Background } from './components/Background'
import { onMount } from 'solid-js'
import * as mainStuff from './three/index'
import { initTheater } from './three/theatre'

const App: Component = () => {
	onMount(() => {
		;(window as any).mainStuff = mainStuff
		initTheater()
		mainStuff.init()
	})
	return (
		<>
			<Background />
		</>
	)
}

export default App
