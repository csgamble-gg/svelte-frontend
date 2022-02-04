<script lang="ts">
	export let height: number = 1;
	export let vertical: boolean = false;
</script>

<div
	class={vertical ? 'divider-vertical' : 'divider'}
	style="height: {height}px;"
/>

<style>
	.divider {
		width: 100%;
		background: linear-gradient(
			90deg,
			rgba(116, 148, 221, 0.1) 48.96%,
			rgba(116, 148, 221, 0) 100%
		);
		z-index: 99999;
	}

	.divider-vertical {
		width: 65px;
		height: 100%;
		background: #9cbbff;
		transform: rotate(90deg);
		opacity: 0.1;
	}
</style>
