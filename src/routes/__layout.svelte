<script context="module" lang="ts">
	import { page } from '$app/stores';
	import Header from '$components/Header/Header.svelte';
	import Modal from '$components/Modals/Modal.svelte';
	import Sidebar from '$components/Sidebar/Sidebar.svelte';
	import ToastList from '$components/ToastList/index.svelte';
	import {
		createSSRClient,
		createSSRQuery
	} from '$libs/urql/createSSRClient';
	import { sidebarStore } from '$stores/app';
	import { createStores, getStores } from '$stores/user/index';
	import type { LoadOutput, LoadProps } from '$types/index';
	import type { LoadInput } from '@sveltejs/kit';
	import { setClient } from '@urql/svelte';
	import '../app.css';
	import { createEmitterStores } from '../emitters/global';
	import '../sentry/index';
	import * as Auth from '../services/auth';
	import { initEmitters } from '../services/index';

	async function resolvePromise<T = Promise<unknown>>(
		promise: T
	): Promise<T> {
		try {
			let result = await promise;
			return result;
		} catch (e) {
			return null;
		}
	}
	// ssr load our data ;)
	export async function load(
		loadOptions: LoadInput
	): Promise<{ props: LoadProps } | LoadOutput> {
		let urqlClient = createSSRClient(loadOptions);

		const { hydrate } = sidebarStore;
		hydrate(loadOptions.session);

		let stuff = {
			query: createSSRQuery({ client: urqlClient }),
			urqlClient
		};

		try {
			const [authResponse] = await Promise.all([
				resolvePromise(Auth.load({ ...loadOptions, stuff }))
			]);

			return {
				props: {
					user: authResponse,
					urqlClient
				},
				stuff
			};
		} catch (e) {
			return { props: { urqlClient }, stuff };
		}
	}
</script>

<script lang="ts">
	createEmitterStores();
	createStores();
	initEmitters();
	export let urqlClient: LoadProps['urqlClient'];
	export let user: LoadProps['user'];

	setClient(urqlClient);

	const { userStore } = getStores();

	const hydrate = () => {
		if (user) {
			Auth.initialize(user);
			userStore.setUser(user);
		}
	};

	hydrate();

	$: modal = $page.url.searchParams.get('modal');
</script>

{#if modal}
	<Modal {modal} />
{/if}

<svelte:head>
	<meta content="width=device-width" name="viewport" />
</svelte:head>

<ToastList />

<div class="bg-primaryBg h-screen w-screen flex flex-row">
	<Sidebar />

	<div class="flex flex-col w-full min-w-0 overflow-x-hidden">
		<nav>
			<Header />
		</nav>
		<main class="pr-3 mt-3">
			<slot />
		</main>
	</div>
</div>

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
