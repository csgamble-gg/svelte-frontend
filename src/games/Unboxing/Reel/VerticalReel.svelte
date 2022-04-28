<script lang="ts">
	export let reelIndex: number;

	import {
		currentCase,
		isDoneRolling,
		isRolling,
		winningIndex,
		winningItem
	} from '../state/game';
	import { tweened } from 'svelte/motion';
	import { ROLL_TIME, SNAP_TIME } from '../types';
	import {
		expoOut,
		quadIn,
		quartOut,
		quintIn,
		quintInOut
	} from 'svelte/easing';
	import { onDestroy, onMount } from 'svelte';
	import { random as randomNumber } from 'lodash-es';
	import { fly } from 'svelte/transition';
	import resize, { ResizeObserverEvent } from '$utils/resizeObserver';
	import { Text } from '@csgamble-gg/nebula-ui';
	import { UnboxingSubscriptionDocument } from '$generated/graphql';
	import { formatPennies } from '$utils/currency';
	import { animate } from 'svelte-motion';
	import ReelSlot from './ReelSlot.svelte';

	const ITEM_HEIGHT = 110;
	const REEL_LENGTH = 30;

	let activeIndex: null | number = null;
	$: offset = null;

	$: animateTo = null;

	function getCaseSkin() {
		const randomParentSkin =
			$currentCase.items[randomNumber(0, $currentCase.items.length - 1)];
		const randomChildSkin =
			randomParentSkin.wears[
				randomNumber(0, randomParentSkin.wears.length - 1)
			];
		return randomChildSkin;
	}

	$: slots = new Array(REEL_LENGTH).fill(0).map((_, i) => {
		if ($winningIndex) {
			return i === $winningIndex ? $winningItem : getCaseSkin();
		} else {
			return getCaseSkin();
		}
	});

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

	let transY = tween(0, {
		duration: ROLL_TIME - SNAP_TIME,
		easing: expoOut
	});

	const anim = (toIndex: number) => {
		transY.reset();

		// vary the position so we can snap to it
		// results in a more fluid animation
		animateTo = toIndex * 100 + 40;
		offset = randomNumber(animateTo - 25, animateTo + 25);

		transY.update(() => offset);
	};

	transY.subscribe((value) => {
		if ($isRolling) {
			activeIndex = Math.round(Math.abs(value) / ITEM_HEIGHT);
		} else {
			activeIndex = null;
		}

		// if we are at our animateTo value, snap to the true position
		if (value === offset) {
			transY.set(animateTo, {
				duration: SNAP_TIME
			});
		}
	});

	const unsubscribe = isRolling.subscribe((isRolling) => {
		if (isRolling) {
			anim($winningIndex);
			activeIndex = null;
		}
	});

	onDestroy(() => {
		return unsubscribe();
	});
</script>

<div class="vertical-reel">
	<div
		class="internal-reel"
		style={`transform: translateY(-${$transY}px)`}
	>
		{#each slots as slot, i}
			{@const isWinningItem = !$isDoneRolling
				? false
				: i === $winningIndex}
			{@const isActive = i === activeIndex + 2}
			<div class="slot">
				<div
					class="slot-detail"
					class:done={$isDoneRolling && isWinningItem}
					style:opacity={`${$isDoneRolling ? (isWinningItem ? 1 : 0) : 1}`}
				>
					<img
						src={slot.iconUrl || slot[reelIndex].iconUrl}
						style:transform={`scale(${isActive ? 1.2 : 1})`}
						style:opacity={$isRolling ? (isActive ? 1 : 0.5) : 1}
						alt="skin"
						class:winning-item={isWinningItem}
						class="slot-image {$isRolling ? 'rolling' : ''}"
					/>
					{#if isWinningItem}
						<div
							class="info"
							in:fly|local={{
								y: 200,
								duration: 100
							}}
						>
							<Text size="sm" variant="subtle"
								>{$winningItem[reelIndex].name}</Text
							>
							<Text size="sm">{$winningItem[reelIndex].wear}</Text>
							<Text size="sm" weight="medium"
								>${formatPennies($winningItem[reelIndex].price)}</Text
							>
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.vertical-reel {
		width: 200px;
		height: 250px;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden;
		position: relative;
		background: #181d2d;
		border-radius: 8px;
	}

	.internal-reel {
		width: 100%;
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

	.slot {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		transition: all 0.33s ease-out;

		.slot-detail {
			width: 130px;
			height: 100%;

			.slot-image {
				width: 100%;
				height: 100%;

				&.rolling {
					transition: all 0.33s ease-out;
				}
			}

			&.done {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 100%;
				transform: translate(0, -25px);
				.slot-image {
					width: 40%;
					height: 40%;
					transition: none;
				}
			}

			.info {
				display: flex;
				flex-direction: column;
				align-items: center;
			}
		}
	}
</style>
