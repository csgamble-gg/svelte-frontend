<script lang="ts">
	import { Text } from '@csgamble-gg/nebula-ui';
	import { slide } from 'svelte/transition';
	import Skeleton from '../../components/generics/Skeleton.svelte';
	import BluePlanet from '../../icons/BluePlanet.svg';
	import OrangePlanet from '../../icons/OrangePlanet.svg';
	import PurplePlanet from '../../icons/PurplePlanet.svg';
	import { gameHistory } from './state/game';

	function getRandomInt(max: number): number {
		return Math.floor(Math.random() * Math.floor(max));
	}
</script>

<div class="recent-rolls">
	<Text variant="subtle">History</Text>
	<div class="placeholder-roll" />
	{#if $gameHistory.length === 0}
		{#each [1, 2, 3, 4, 5, 6] as placeholder}
			<Skeleton loading={true} circle={true}>
				<div class="" style="width: 37.48px; height: 37.48px;" />
			</Skeleton>
		{/each}
	{:else}
		{#each $gameHistory as recentRoll (recentRoll._id)}
			<div
				transition:slide
				class="img-wrapper"
				style="transform: rotate({getRandomInt(360)}deg)"
			>
				{#if recentRoll.rollValue === 28}
					<img
						src={OrangePlanet}
						alt=""
						class="bg-cover bg-center border-0 hover:scale-125"
						width="37.48px"
						height="37.48px"
					/>
				{:else if recentRoll.rollValue % 2 === 0}
					<img
						src={PurplePlanet}
						alt=""
						class="bg-cover bg-center border-0 hover:scale-125"
						width="37.48px"
						height="37.48px"
					/>
				{:else}
					<img
						alt=""
						src={BluePlanet}
						class="bg-cover bg-center border-0 hover:scale-125"
						width="37.48px"
						height="37.48px"
					/>
				{/if}
			</div>
		{/each}
	{/if}
</div>

<style lang="scss">
	.recent-rolls {
		z-index: 55;
		display: flex;
		flex-direction: column;
		width: 55px;
		align-items: center;
		gap: 16.52px;
		-webkit-mask-image: -webkit-linear-gradient(
			272deg,
			#c4c4c4 0%,
			rgba(196, 196, 196, 0.4) 87.54%,
			rgba(196, 196, 196, 0.15) 92.88%,
			rgba(196, 196, 196, 0) 99.03%
		);
		position: absolute;
		top: 75px;
		left: 25px;
	}

	.img-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		img {
			background-size: cover;
			background-position: center;
			border: none;

			&:hover {
				transform: scale(1.25);
			}
		}
	}

	.placeholder-roll {
		width: 37.48px;
		height: 37.48px;
		opacity: 0.5;
		border: 1px dashed #9cbbff;
		box-sizing: border-box;
		transform: rotate(-172.44deg);
		border-radius: 999px;
		transform: ro;
	}

	.wrapper {
	}
</style>
