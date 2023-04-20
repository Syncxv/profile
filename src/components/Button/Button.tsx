import { Component } from "solid-js";

import { isFacingSun } from "../../App";
import Styles from './Button.module.scss';

interface ButtonProps {
	onClick: () => void;
}


export const Button: Component<ButtonProps> = ({ onClick }) => {
	return (
		<div class={`${Styles.container} ${isFacingSun() ? Styles.close : ''}`}>
			<button
				type="button"
				class={`${Styles.button} `}
				onClick={onClick}
			>
				{isFacingSun() ? 'X' : 'Play'}
			</button>
		</div>
	);
};
