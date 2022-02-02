<script lang="ts">
	import Exit from '$icons/svgs/Exit/Exit.svelte';
	export let icon: 'error' | 'success' | 'warning' | 'info';

	const icons = {
		error: Exit
	};

	const selectedIcon = icons[icon];
</script>

<svelte:component this={selectedIcon} />
