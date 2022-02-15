<script lang="ts">
	import { chatStore } from '$stores/app';
	import ChatExpanded from './ChatExpanded.svelte';
</script>

<div>
	{#if $chatStore === 'visible'}
		<ChatExpanded />
	{:else}
		<div />
	{/if}
</div>
