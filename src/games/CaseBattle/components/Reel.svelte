<script lang="ts">
	export let slots;
	import resize, { ResizeObserverEvent } from '$utils/resizeObserver';
	import { onMount } from 'svelte';
	import { quartOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	// import {
	// 	isDoneRolling,
	// 	isRolling,
	// 	reelSlots,
	// 	winningIndex
	// } from '../state/game';
	// import { ROLL_TIME } from '../types';

	// let translateX = useMotionValue(0);
	// let winningIndex: null | number = null;
	let activeIndex: null | number = null;
	let container: HTMLDivElement;
	$: offset = null;

	// export let amountVisible: number | null = null;
	let amountVisible: number | null = null;

	const ITEM_WIDTH = 115;

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
		// duration: ROLL_TIME,
		easing: quartOut
	});

	const anim = (toIndex: number) => {
		transX.reset();

		offset = (amountVisible / 2) * ITEM_WIDTH - 50;
		const animateTo = toIndex * ITEM_WIDTH - offset;

		transX.update(() => animateTo);
	};

	transX.subscribe((value) => {
		// if ($isRolling) {
		// 	// for every divisible of 150, we set the active index
		// 	activeIndex = Math.round((Math.abs(value) + offset) / ITEM_WIDTH);
		// } else {
		// 	activeIndex = null;
		// }
	});

	// isRolling.subscribe((isRolling) => {
	// 	if (isRolling) {
	// 		anim($winningIndex);
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

<div class="roller" bind:this={container} use:resize>
	<div
		class="internal-roller"
		style={`transform: translateX(-${$transX}px)`}
	>
		{#each slots as reelItem, i (i)}
			<!-- {@const isWinningItem = !$isDoneRolling
				? false
				: i === $winningIndex}
			{@const isActive = i === activeIndex} -->
			<div class="graceful-animation reel-item">
				<img
					src={reelItem.iconUrl}
					alt={reelItem.name}
					width="115px"
					height="auto"
					class="graceful-animation"
				/>
				<!-- {#if isWinningItem}
					<div
						class="winning-item-content"
						in:fly|local={{
							y: 200,
							duration: 100
						}}
					>
						<div class="header">
							<Text size="sm" variant="subtle">{reelItem.name}</Text>
							<Text size="sm">{reelItem.quality}</Text>
						</div>
						<Text size="sm" weight="medium"
							>${reelItem?.price || reelItem.skins[0].price}</Text
						>
					</div>
				{/if} -->
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
		animation: float 6.66s ease-in-out infinite;
	}

	.winning-item-content {
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
