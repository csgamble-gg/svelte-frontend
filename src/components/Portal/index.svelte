<script lang="ts">
	import { browser } from '$app/env';
	import { onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	export let target: HTMLElement | undefined = browser
		? document.body
		: undefined;

	let targetEl: HTMLElement;
	let componentInstance: HTMLDivElement;
	export let node: HTMLDivElement | undefined = undefined;
	export let parentNode: Writable<HTMLElement> | undefined = undefined;

	$: {
		if (node && node?.parentElement && parentNode) {
			parentNode.set(node.parentElement);
		}
	}

	onMount(() => {
		if (typeof target === 'string') {
			targetEl = document.querySelector(target);
			// Force exit
			if (targetEl === null) {
				return () => {};
			}
		} else if (target instanceof HTMLElement) {
			targetEl = target;
		} else {
			throw new TypeError(
				`Unknown target type: ${typeof target}. Allowed types: String (CSS selector), HTMLElement.`
			);
		}

		let portal = document.createElement('div');
		portal.setAttribute('data-portal', 'true');
		targetEl.appendChild(portal);
		portal.appendChild(componentInstance);
		return () => {
			portal.removeChild(componentInstance);
			targetEl.removeChild(portal);
		};
	});
</script>

<div style="display: none" bind:this={node}>
	<div bind:this={componentInstance}>
		<slot />
	</div>
</div>
