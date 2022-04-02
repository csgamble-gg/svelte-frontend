<script lang="ts">
	import Error from '$icons/svgs/Error.svelte';
	import Info from '$icons/svgs/Info.svelte';
	import Success from '$icons/svgs/Success.svelte';

	export let icon: 'error' | 'success' | 'warning' | 'info';

	const icons = {
		error: Error,
		info: Info,
		success: Success
	};

	const selectedIcon = icons[icon];
</script>

<svelte:component this={selectedIcon} />
