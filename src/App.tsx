import type { Component } from 'solid-js'
import { Background } from './components/Background'
import { onMount } from 'solid-js'
import * as mainStuff from './three/index'
import { project, initTheater, sheet } from './three/theatre'

const App: Component = () => {
	onMount(() => {
		;(window as any).mainStuff = mainStuff
		;(window as any).project = project
		;(window as any).sheet = sheet
		mainStuff.init()
		initTheater(true)
	})
	return (
		<>
			<button
				class="absolute top-0"
				onClick={() =>
					sheet.sequence.position >= 10
						? sheet.sequence.play({ direction: 'reverse' })
						: sheet.sequence.play()
				}
			>
				hi
			</button>
			<Background />
		</>
	)
}

export default App
