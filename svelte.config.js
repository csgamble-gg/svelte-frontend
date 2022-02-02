import adapter from '@sveltejs/adapter-node';
import autoprefixer from 'autoprefixer';
import { resolve } from 'path';
import preprocess from 'svelte-preprocess';
import tailwindcss from 'tailwindcss';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		postcss: {
			plugins: [tailwindcss, autoprefixer]
		}
	}),
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
					$icons: resolve('./src/icons'),
					$types: resolve('./src/types'),
					$stores: resolve('./src/stores'),
					$utils: resolve('./src/utils'),
					$emitters: resolve('./src/emitters'),
					$notifications: resolve('./src/notifications')
				}
			}
		}
	}
};

export default config;
