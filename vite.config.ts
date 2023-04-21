import { defineConfig } from 'vite';
import { glslify } from 'vite-plugin-glslify';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
	plugins: [solidPlugin(), glslify({ transformFiles: true })],
	server: {
		port: 3000
	},
	build: {
		target: 'esnext'
	},
});
