<script lang="ts">
	import { onDestroy } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { toast } from './store';
	import type { ToastItem } from './types';

	export let item: ToastItem;

	const progress = tweened(item.initial, { duration: item.duration });
</script>

{console.log($progress)}
<div class="bg-red-900 w-96 h-20 mb-3">
	<span>{item.message}</span>
</div>
