<script lang="ts">
	import { navigating, page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import { cachedRoutes } from './cache';

	export let loading: boolean;

	let to = $page.url.pathname;

	$: if ($navigating) {
		to = $navigating.to.pathname;
	}

	let hidden = false;

	function handleLoading() {
		let isCached = cachedRoutes.has(to);

		hidden = true;

		if (isCached === false) {
			cachedRoutes.add(to);
		}
	}

	$: if (loading) {
		handleLoading();
	} else {
		hidden = false;
	}
</script>

{#if hidden}
	<div class="loader">
		<span> loading stuff u dummy</span>
	</div>
{/if}
{#if !hidden}
	<div in:fly={{ y: 10, opacity: 0, duration: 300 }} class="content">
		<slot />
	</div>
{/if}

<style lang="scss">
	.loader {
		inset: 0;
		background-color: rgba(0, 0, 0, 0.5);
		width: 100%;
		height: 100%;
	}
	.content {
		width: inherit;
		height: inherit;
		overflow: inherit;
	}
</style>
