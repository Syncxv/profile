import { Component, onMount } from 'solid-js';

import { Background } from './components/Background';
import { Sun } from './components/Sun';
import * as mainStuff from './three/index';
import { initTheater, project, sheet } from './three/theatre';

const App: Component = () => {
	onMount(() => {
		(window as any).mainStuff = mainStuff;
		(window as any).project = project;
		(window as any).sheet = sheet;
		mainStuff.init();
		initTheater();
	});

	const handleClick = () => {
		console.log(sheet.sequence.position);
		project.ready.then(() =>
			sheet.sequence.position >= 2.3
				? sheet.sequence.play({ direction: 'reverse', range: [0, 3.3] })
				: sheet.sequence.play({ range: [0, 3.3] })
		);
	};
	return (
		<>
			<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				<button
					type="button"
					class="px-12 py-3 bg-slate-200 rounded-md text-slate-800"
					onClick={handleClick}
				>
					Contact
				</button>
			</div>
			<Sun />
			<Background />
		</>
	);
};

export default App;
