<script context="module" lang="ts">
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
			const { data } = await stuff.query<CurrentUserQuery>(
				CurrentUserDocument,
				{}
			);

			return {
				props: {
					user: data.getCurrentUser,
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
	export let urqlClient: LoadProps['urqlClient'];
	export let user: LoadProps['user'];

	import Header from '$components/Header/Header.svelte';
	import Sidebar from '$components/Sidebar/Sidebar.svelte';
	import {
		CurrentUserDocument,
		CurrentUserQuery
	} from '$generated/graphql';
	import {
		createSSRClient,
		createSSRQuery
	} from '$libs/urql/createSSRClient';
	import { sidebarStore } from '$stores/app';
	import { createStores, getStores } from '$stores/user/index';
	import type { LoadInput } from '@sveltejs/kit';
	import { setClient } from '@urql/svelte';
	import type { LoadOutput, LoadProps } from 'src/types';
	import '../app.css';
	import '../sentry/index';
	createStores();
	setClient(urqlClient);

	const { userStore } = getStores();

	const hydrate = () => {
		if (user) {
			userStore.setUser(user);
		}
	};

	hydrate();
</script>

<svelte:head>
	<meta content="width=device-width" name="viewport" />
</svelte:head>

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
	<!--
	<SvelteToast />
	<div class="flex flex-col w-full min-w-0 overflow-x-hidden">
		<nav>
			<Header />
		</nav>
		<main class="pr-3 mt-3">
			<slot />
		</main>
	</div>
	 -->
</div>

<style global="" lang="postcss">
	@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
