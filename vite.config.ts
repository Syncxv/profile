import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import { glslify } from 'vite-plugin-glslify'

export default defineConfig({
	plugins: [solidPlugin(), glslify({ transformFiles: true })],
	server: {
		port: 3000
	},
	build: {
		target: 'esnext'
	}
})
