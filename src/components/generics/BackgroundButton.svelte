<script lang="ts">
	import { Text } from '@csgamble-gg/nebula-ui';
	export let background;
	export let disabled: boolean = false;
	export let title: string;
	export let onClick: () => void;

	let backgroundImage = {
		purple: `
		linear-gradient(
			180deg,
			rgba(255, 114, 220, 0) 41.67%,
			rgba(255, 114, 220, 0.6) 100%
		),
		url('/assets/PurplePlanet.svg') no-repeat 50% 50%;
		`,
		blue: `
		linear-gradient(180deg, rgba(84, 226, 202, 0) 43.75%, rgba(84, 226, 202, 0.7) 100%),
		url("/assets/BluePlanet.svg") no-repeat 50% 50%
		`,
		orange: `
        linear-gradient(180deg, rgba(226, 220, 84, 0) 43.75%, rgba(226, 135, 84, 0.7) 100%),
        url("/assets/OrangePlanet.svg") no-repeat 50% 50%
        `
	};
</script>

<button
	{...$$restProps}
	class="wrapper {disabled === true ? 'disabled' : ''}"
	on:click={onClick}
	{disabled}
	style="background: {backgroundImage[background]}; background-size: 165%;"
>
	<Text weight="semibold" size="sm">{title}</Text>
</button>

<style>
	.wrapper {
		height: 48px;
		width: 100%;
		border: none;
		z-index: 1;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
	}

	.wrapper::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
		transform: rotate(180deg);
		border-radius: 6px;
	}

	.wrapper::after {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 0;
		border-radius: 6px;
		width: 100%;
		height: 100%;
	}

	.disabled {
		cursor: not-allowed;
	}

	.disabled::after {
		content: '';
		position: absolute;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 0;
		border-radius: 6px;
		width: 100%;
		height: 100%;
	}
</style>
