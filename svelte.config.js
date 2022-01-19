import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';
import { resolve } from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter({ out: 'build' }),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: {
			optimizeDeps: {
				exclude: ['@urql/svelte']
			},
			mode: process.env.ENVIRONMENT || 'development',
			resolve: {
				alias: {
					$games: resolve('src/games'),
					$components: resolve('./src/components'),
					$libs: resolve('./src/libs'),
					$generated: resolve('./src/generated'),
					$icons: resolve('./src/icons')
				}
			}
		}
	}
};

export default config;
