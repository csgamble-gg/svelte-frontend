<script lang="ts">
	import BluePlanet from '$icons/BluePlanet.svg';
	import OrangePlanet from '$icons/OrangePlanet.svg';
	import PurplePlanet from '$icons/PurplePlanet.svg';

	export let position: number;
	export let index: number;

	let positions: { x: number; y: number };

	function getPosition() {
		const x = 527 - Math.round(527 * Math.cos(position));
		const y = 527 - Math.round(527 * Math.sin(position));

		return { x, y };
	}

	positions = getPosition();
</script>

<div class="absolute" style="left: {positions.x}px; top: {positions.y}px;">
	{#if index === 0}
		<img
			src={OrangePlanet}
			alt=""
			class="bg-cover bg-center border-0"
			style="width: 58px; height: 58px;"
		/>
	{:else if index % 2}
		<img
			src={BluePlanet}
			alt=""
			class="bg-cover bg-center border-0"
			style="width: 58px; height: 58px;"
		/>
	{:else}
		<img
			alt=""
			src={PurplePlanet}
			class="bg-cover bg-center border-0"
			style="width: 58px; height: 58px;"
		/>
	{/if}
</div>
