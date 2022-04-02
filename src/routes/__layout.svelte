<script context="module" lang="ts">
	import { browser } from '$app/env';
	import { navigating, page } from '$app/stores';
	import Header from '$components/Header/Header.svelte';
	import MobileFooter from '$components/MobileFooter/MobileFooter.svelte';
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
	import { mobileView } from '$stores/window';
	import type { LoadInput, LoadOutput, LoadProps } from '$types/index';
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

	let fromTo = [
		(from: string, to: string) => {
			let rootFrom = from.split('/')[1];
			let rootTo = to.split('/')[1];

			return rootFrom !== rootTo;
		}
	];

	$: isLoading =
		$navigating &&
		$navigating.from.pathname !== $navigating.to.pathname &&
		fromTo.some((has) =>
			has($navigating.from.pathname, $navigating.to.pathname)
		);
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
	<div class="loading">
		<div class="loading logo" transition:fade={{ duration: 150 }}>
			<MainLogo />
		</div>
	</div>
{/if}

<div class="wrapper">
	<Sidebar />
	<div class="content">
		<Header />
		<!-- <ContentLoader loading={isLoading}> -->
		<main class="game">
			<slot />
		</main>
		<!-- </ContentLoader> -->
		{#if $mobileView}
			<MobileFooter />
		{/if}
	</div>
</div>

<style lang="scss">
	@use '@csgamble-gg/nebula-ui/style/main.scss';

	:global(:root) {
		margin: 0;
		height: 100%;
		width: 100%;
		background-color: var(--variant-grey-color);
		--header-height: 91px;
	}

	:global(body) {
		margin: 0;
		height: 100%;
		width: 100%;
		background-color: var(--variant-grey-color);
		font-family: Poppins;
	}

	:global(#svelte) {
		height: 100%;
		width: 100%;
	}

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
		position: relative;
		width: 100%;
		height: 100%;
		background-color: var(--variant-grey-color);
		&.logo {
			position: absolute;
			display: flex;
			align-items: center;
			justify-content: center;
			animation: breathing 2s ease-out infinite;
		}
		z-index: 9999;
	}

	.wrapper {
		display: flex;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.content {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}

	.game {
		// no clue why this only causes padding on the left side
		// padding: 0 2vw;
		flex: 1;
		display: flex;
		justify-content: center;
		width: 100%;
		max-width: 100%;
		height: 100%;
		overflow-y: scroll;
	}
</style>
