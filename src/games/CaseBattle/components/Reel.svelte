<script lang="ts">
	import { formatPennies } from '$utils/currency';

	export let playerId: string;
	import resize, { ResizeObserverEvent } from '$utils/resizeObserver';
	import { Text } from '@csgamble-gg/nebula-ui';
	import { random as randomNumber } from 'lodash-es';
	import { onMount } from 'svelte';
	import { quartOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { get } from 'svelte/store';
	import { fly } from 'svelte/transition';
	import { currentRound, isRolling } from '../state/game';

	const REEL_LENGTH = 32;
	const ANIMATE_TO_INDEX = 25;
	const ITEM_WIDTH = 115;

	function getCaseSkin() {
		const randomParentSkin =
			$currentRound.case.items[
				randomNumber(0, $currentRound.case.items.length - 1)
			];
		const randomChildSkin =
			randomParentSkin.wears[
				randomNumber(0, randomParentSkin.wears.length - 1)
			];
		return randomChildSkin;
	}

	$: slots = $currentRound
		? new Array(REEL_LENGTH).fill(0).map(() => {
				return getCaseSkin();
		  })
		: [];

	let activeIndex: null | number = null;
	let container: HTMLDivElement;
	$: offset = null;

	let amountVisible: number | null = null;

	const tween = (init: number, options = {}) => {
		const store = tweened(init, { ...options });

		return {
			...store,
			reset: (value?: number) => {
				return store.set(value || init, { duration: 0 });
			},
			set: (value: number, options = {}) => {
				return store.set(value, { ...options });
			}
		};
	};

	const transX = tween(0, {
		duration: 5000,
		easing: quartOut
	});

	const anim = (toIndex: number) => {
		transX.reset();

		offset = (amountVisible / 2) * ITEM_WIDTH - 50;
		const animateTo = toIndex * ITEM_WIDTH - offset;

		transX.update(() => animateTo);
	};

	transX.subscribe((value) => {
		if ($isRolling) {
			activeIndex = Math.round((Math.abs(value) + offset) / ITEM_WIDTH);
		} else {
			activeIndex = null;
		}
	});

	$: winningSkin = null;

	currentRound.subscribe((round) => {
		if (!round) return;

		const playersRound = round.drops.find(
			(drop) => drop.playerId === playerId
		);
		if (!playersRound) return;
		if (playersRound.winningSkin && $isRolling) {
			winningSkin = playersRound.winningSkin;
			anim(ANIMATE_TO_INDEX);
			activeIndex = null;
		}
	});

	// isRolling.subscribe((isRolling) => {
	// 	if (isRolling) {
	// 		anim(ANIMATE_TO_INDEX);
	// 		activeIndex = null;
	// 	}
	// });

	onMount(() => {
		const containerWidth = container.getBoundingClientRect().width;
		amountVisible = Math.round(containerWidth / ITEM_WIDTH);
		transX.reset(containerWidth / 2);
	});

	function handleResize(event: ResizeObserverEvent) {
		const { width } = event.detail;

		amountVisible = Math.round(width / ITEM_WIDTH);
		transX.reset(width / 2);
	}
</script>

<div
	class="roller"
	bind:this={container}
	use:resize
	on:resize={handleResize}
>
	<div
		class="internal-roller"
		style={`transform: translateX(-${$transX}px)`}
	>
		{#each slots as reelItem, i (i)}
			<!-- {@const isWinningItem = $isRolling ? false : i === ANIMATE_TO_INDEX} -->
			{@const isWinningItem = false}
			{@const isActive = i === activeIndex}
			<div class="graceful-animation reel-item">
				<img
					src={reelItem.iconUrl}
					alt="skin"
					width="115px"
					height="auto"
					class="graceful-animation"
					style:transform={`scale(${isActive ? 1.2 : 1})`}
				/>
				{#if isWinningItem}
					<div
						class="winning-item"
						in:fly|local={{
							y: 200,
							duration: 100
						}}
					>
						<div class="header">
							<Text size="sm" variant="subtle">{winningSkin.name}</Text>
							<Text size="sm">{winningSkin.wear}</Text>
						</div>
						<Text size="sm" weight="medium"
							>${formatPennies(winningSkin.price)}</Text
						>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.roller {
		overflow: hidden;
		display: flex;
		align-items: center;
		flex: 1;
	}

	.reel-item {
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.internal-roller {
		width: 0px;
		position: relative;
		height: 100%;
		align-self: center;
		display: flex;
		flex-direction: row;
		align-items: center;
		/* gap: 5px; */
	}

	@keyframes float {
		0% {
			transform: translatey(0px);
		}
		50% {
			transform: translatey(-10px);
		}
		100% {
			transform: translatey(3px);
		}
	}

	.winning-item {
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: 5px;
		width: max-content;

		.header {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}

	.graceful-animation {
		transition: all 0.33s ease-out;
	}
</style>
