import { Component } from "solid-js";

import { isFacingSun } from "../../App";
import Styles from './Button.module.scss';

interface ButtonProps {
	onClick: () => void;
}

export const Button: Component<ButtonProps> = ({ onClick }) => {
	return (
		<div class={`${Styles.container}`}>
			<button
				type="button"
				class={`${Styles.button} ${isFacingSun() ? `${Styles.close} ${Styles.topRight}` : Styles.center}`}
				onClick={onClick}
			>
				<span class={isFacingSun() ? Styles.fade : ''}>{isFacingSun() ? '' : 'stuff'}</span>
			</button>
		</div>
	);
};
