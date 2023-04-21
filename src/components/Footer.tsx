
import { Component } from 'solid-js';

import { formatDate } from "../utils/formatDate";
import { GithubIcon } from './Icons/Github';

export const Footer: Component = () => {
	return <div class="absolute bottom-0 right-0 m-1 z-20">
		<div class="flex flex-col items-end justify-center">
			<a
				title="github"
				href="https://github.com/Syncxv/profile"
				target="_blank"
				rel="noopener"
				class="flex gap-x-1"
			>
				source:
				<GithubIcon />
			</a>
			<p>Last updated on {formatDate(import.meta.env.VITE_BUILD_DATE)}</p>
		</div>
	</div>;
};
