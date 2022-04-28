<script lang="ts">
	import type { SkinWear } from '$generated/graphql';

	import { convertPenniesToDollars } from '$libs/currencyConversion';
	import resize, { ResizeObserverEvent } from '$utils/resizeObserver';
	import { Text } from '@csgamble-gg/nebula-ui';
	import { random as randomNumber } from 'lodash-es';
	import { onMount, onDestroy } from 'svelte';
	import { quartOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { fly } from 'svelte/transition';
	import {
		currentCase,
		isDoneRolling,
		isRolling,
		winningIndex,
		winningItem
	} from '../state/game';
	import { ROLL_TIME } from '../types';

	let activeIndex: null | number = null;
	let container: HTMLDivElement;
	$: offset = null;

	let amountVisible: number | null = null;

	const ITEM_WIDTH = 130;
	const REEL_LENGTH = 38;

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
			return i === $winningIndex[0] ? $winningItem : getCaseSkin();
		} else {
			return getCaseSkin();
		}
	}) as SkinWear[];

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
		duration: ROLL_TIME,
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
			// for every divisible of 150, we set the active index
			activeIndex = Math.round((Math.abs(value) + offset) / ITEM_WIDTH);
		} else {
			activeIndex = null;
		}
	});

	const unsubscribe = isRolling.subscribe((isRolling) => {
		if (isRolling) {
			console.log('huh');
			anim($winningIndex[0]);
			activeIndex = null;
		}
	});

	onMount(() => {
		const containerWidth = container.getBoundingClientRect().width;
		amountVisible = Math.round(containerWidth / ITEM_WIDTH);
		transX.reset(containerWidth / 2);
	});

	onDestroy(() => {
		return unsubscribe();
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
	<div class="win-line" class:rolling={$isRolling} />
	<div
		class="internal-roller"
		style={`transform: translateX(-${$transX}px)`}
	>
		{#each slots as slot, i (i)}
			{@const isWinningItem = !$isDoneRolling
				? false
				: i === $winningIndex[0]}
			{@const isActive = i === activeIndex}
			<div
				class="graceful-animation reel-item"
				style:opacity={`${$isDoneRolling ? (isWinningItem ? 1 : 0) : 1}`}
			>
				<img
					src={slot.iconUrl || slot[0].iconUrl}
					alt="skin"
					width="130px"
					height="auto"
					style:transform={`scale(${isActive ? 1.2 : 1})`}
					class="graceful-animation"
					class:winning-item={isWinningItem}
				/>
				{#if isWinningItem}
					<div
						class="winning-item-content"
						in:fly|local={{
							y: 200,
							duration: 100
						}}
					>
						<div class="header">
							<Text size="sm" variant="subtle">{$winningItem[0].name}</Text
							>
							<Text size="sm">{$winningItem[0].wear}</Text>
						</div>
						<Text size="sm" weight="medium"
							>${convertPenniesToDollars($winningItem[0].price, 2)}</Text
						>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.win-line {
		position: absolute;
		left: 50%;
		width: 1px;
		height: 100%;
		top: 0;
		transition: all 300ms ease-in-out;

		&.rolling {
			z-index: 999;
			&:after {
				content: '';
				position: absolute;
				left: -80px;
				transform: rotate(-180deg);
				background: radial-gradient(
					50% 45.23% at 50% 100.23%,
					rgba(255, 230, 0, 0.2) 0%,
					rgba(27, 30, 47, 0) 100%
				);
				width: 171px;
				height: 85px;
			}

			&::before {
				content: '';
				position: absolute;
				left: -80px;
				bottom: 0;
				background: radial-gradient(
					50% 45.23% at 50% 100.23%,
					rgba(255, 230, 0, 0.2) 0%,
					rgba(27, 30, 47, 0) 100%
				);
				width: 171px;
				height: 85px;
			}
		}

		&:not(rolling) {
			&:after {
				content: '';
				position: absolute;
				left: -80px;
				transform: rotate(-180deg);
				background: radial-gradient(
					50% 45.23% at 50% 100.23%,
					rgba(31, 216, 149, 0.2) 0%,
					rgba(27, 30, 47, 0) 100%
				);
				width: 171px;
				height: 85px;
			}

			&::before {
				content: '';
				position: absolute;
				left: -80px;
				bottom: 0;
				background: radial-gradient(
					50% 45.23% at 50% 100.23%,
					rgba(31, 216, 149, 0.2) 0%,
					rgba(27, 30, 47, 0) 100%
				);
				width: 171px;
				height: 85px;
			}
		}
	}
	.roller {
		flex: 1;
		overflow: hidden;
		display: flex;
		height: 100%;
		align-items: center;
		position: relative;

		background: #181d2d;
		border-radius: 8px;
	}

	.reel-item {
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.internal-roller {
		width: 0px;
		position: relative;
		height: 165px;
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
