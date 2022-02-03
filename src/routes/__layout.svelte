<script context="module" lang="ts">
	import { browser } from '$app/env';
	import { page } from '$app/stores';
	import Header from '$components/Header/Header.svelte';
	import Modal from '$components/Modals/Modal.svelte';
	import Sidebar from '$components/Sidebar/Sidebar.svelte';
	import ToastList from '$components/ToastList/index.svelte';
	import MainLogo from '$icons/svgs/MainLogo/MainLogo.svelte';
	import {
		createSSRClient,
		createSSRQuery
	} from '$libs/urql/createSSRClient';
	import { sidebarStore } from '$stores/app';
	import { createStores, getStores } from '$stores/user/index';
	import type { LoadOutput, LoadProps } from '$types/index';
	import type { LoadInput } from '@sveltejs/kit';
	import { setClient } from '@urql/svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
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
	createStores();
	createEmitterStores();
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

	let ready = false;

	onMount(() => {
		ready = true;
	});

	// TODO: add development check
	if (browser && false) {
		console.log(
			'%cSTOP!',
			'color: red; font-weight: bold; font-size: 72px;'
		);
		console.log(
			"%cThis is a browser feature intended for developers. If someone told you to copy and paste something here to enable a CSGamble feature or 'hack' someone's account, it is a scam and will give them access to your CSGamble account.",
			'font-size: 24px; color: white; font-weight: bold;'
		);
	}
</script>

{#if modal}
	<Modal {modal} />
{/if}

<svelte:head>
	<meta content="width=device-width" name="viewport" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<ToastList />

{#if ready === false}
	<div
		class="w-screen h-screen bg-primaryBg fixed z-50 flex items-center justify-center"
		transition:fade={{ duration: 150 }}
	>
		<div class="loading">
			<MainLogo />
		</div>
	</div>
{/if}

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

	@keyframes breathing {
		0% {
			transform: scale(0.9);
		}

		25% {
			transform: scale(1);
		}

		60% {
			transform: scale(0.9);
		}

		100% {
			transform: scale(0.9);
		}
	}

	.loading {
		animation: breathing 2s ease-out infinite;
	}
</style>
