<script>
	import { fade, fly } from 'svelte/transition';
	import { toast } from './store';
	import ToastItem from './ToastItem.svelte';

	let items;
	$: toasts = $toast;
</script>

<ul class="toast-container">
	{#each toasts as item (item.id)}
		<li>
			<ToastItem {item} />
		</li>
	{/each}
</ul>

<style>
	.toast-container {
		position: fixed;
		top: 0;
		right: 0;
		z-index: 9999;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
