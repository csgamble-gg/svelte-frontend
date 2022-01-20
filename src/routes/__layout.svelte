<script context="module" lang="ts">
	import '../app.css';
	import Sidebar from '../components/Sidebar/Sidebar.svelte';
	import Header from '../components/Header/Header.svelte';
	import { operationStore } from '@urql/svelte';
	import { browser, dev } from '$app/env';
	import urqlClient from '$libs/urql/urqlClient';
	import { get } from 'svelte/store';

	/**
	 * @type (import("@sveltejs/kit').Load}
	 */

	export async function load({ fetch, context }) {
		const client = await urqlClient({ fetch, dev: browser && dev });

		return {
			stuff: {
				...context,
				client,
				query: async (query, variables, context, normalize) => {
					const store = operationStore(query, variables, context);
					const result = await client
						.query(store.query, store.variables, store.context)
						.toPromise();
					Object.assign(get(store), result);
					// Allow to access deep nested object directly at data
					// if (normalize) {
					// 	const { subscribe } = store;
					// 	return Object.create(store, {
					// 		subscribe: {
					// 			enumerable: true,
					// 			value: readable(store, (set) => {
					// 				const unsubscribe = subscribe((result) => {
					// 					if (result.data) {
					// 						Object.assign(result.data, normalize(result.data, result));
					// 					}
					// 					set(result);
					// 				});
					// 				return unsubscribe;
					// 			}).subscribe
					// 		}
					// 	});
					// }
					return store;
				}
			},
			props: { client }
		};
	}
</script>

<script lang="ts">
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { setClient } from '@urql/svelte';

	/**
	 * @type {import('@urql/svelte').Client}
	 */
	export let client;
	setClient(client);
</script>

<svelte:head>
	<meta content="width=device-width" name="viewport" />
</svelte:head>

<div class="bg-primaryBg h-screen w-screen flex flex-row">
	<Sidebar />
	<SvelteToast />
	<div class="flex flex-col w-full min-w-0 overflow-x-hidden">
		<nav>
			<Header />
		</nav>
		<main class="pr-3 mt-3">
			<slot />
		</main>
	</div>
</div>

<style global="" lang="postcss">
	@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
