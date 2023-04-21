import { Component, createSignal, onMount } from 'solid-js';

import { Button } from './components/Button/Button';
import { Footer } from './components/Footer';
import { Plane } from "./components/Plane";
import { Sun } from "./components/Sun";
import * as mainStuff from './three/index';
import { initTheater, project, sheet } from './three/theatre';

export const [isPlaying, setPlaying] = createSignal(false);
export const [isFacingSun, setIsFacingSun] = createSignal(false);
const App: Component = () => {

	onMount(() => {
		(window as any).mainStuff = mainStuff;
		(window as any).project = project;
		(window as any).sheet = sheet;
		mainStuff.init();
		initTheater();
	});

	const handleClick = async () => {
		await project.ready;
		if (isPlaying()) return;
		setPlaying(true);
		if (sheet.sequence.position >= 3.3) {
			setIsFacingSun(false);
			sheet.sequence.play({ direction: 'reverse', range: [0, 3.3] }).finally(() => {
				setPlaying(false);
			});
		} else {
			setIsFacingSun(true);
			sheet.sequence.play({ range: [0, 3.3] }).finally(() => {
				setPlaying(false);
			});
		}
	};
	return (
		<>
			<div class="container">
				<h1 class="z-10">hey</h1>
			</div>
			<Button onClick={handleClick} />
			<Sun />
			<Plane />
			<Footer />
		</>
	);
};

export default App;
