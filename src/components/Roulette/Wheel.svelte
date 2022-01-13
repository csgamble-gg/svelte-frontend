<script lang="ts">
	import WheelItem from './WheelItem.svelte';
	import Timer from './Timer.svelte';
	import { animate, Motion, useMotionValue } from 'svelte-motion';
	import { rouletteContext } from './Roulette.context';
	import { writable } from 'svelte/store';

	const ROULETTE_SPOTS = 38;
	const fragments = 360 / ROULETTE_SPOTS;

	const radToDeg = (rad: number) => rad * (180 / Math.PI);

	const thetaPositions = new Array(ROULETTE_SPOTS)
		.fill(0)
		.map((_, i) => (fragments / 180) * i * Math.PI);

	const rotate = useMotionValue(14);

	let animation = {};

	let isSpinning = writable(false);

	isSpinning.subscribe((value) => {
		if ($rouletteContext.game === null) return;
		if (value) {
			const rotation = radToDeg(thetaPositions[$rouletteContext.game.rollValue] + 0.08);
			animation = animate(rotate, rotation + 720, {
				type: 'tween',
				bounce: 0.05,
				duration: 7.5,
				onComplete: () => {
					animation = {};
					rotate.set(rotation);
				}
			});
		}
	});

	rouletteContext.subscribe((rouletteContext) => {
		if (rouletteContext.game === null) return;
		if (rouletteContext.game.status === 'started') {
			isSpinning.set(true);
		}
		if (rouletteContext.game.status === 'created') {
			isSpinning.set(false);
		}
	});
</script>

<div class="flex align-center flex-nowrap justify-center overflow-hidden">
	<div class="wheel-wrapper">
		<div class="z-10 w-auto absolute inner-wheel">
			<Timer />
		</div>
		<div class="tick" />
		<Motion let:motion style={{ rotate }}>
			<div class="wheelItems" use:motion>
				{#each thetaPositions as wheelSlot, index}
					<WheelItem position={wheelSlot} {index} />
				{/each}
			</div>
		</Motion>
	</div>
</div>

<style>
	.tick {
		position: absolute;
		width: 2px;
		height: 58px;
		top: 1055px;
		left: 50%;
		z-index: 99999;
		background-color: #ffe178;
		border: 1px solid;
		border-image-source: linear-gradient(
			90deg,
			#121623 0%,
			#fffb99 40.95%,
			#ffe178 54.77%,
			#131925 94.74%
		);
	}

	.tick::after {
		content: '';
		position: relative;
		width: 1px;
		height: 10px;
	}

	.wheel-wrapper {
		display: flex;
		justify-content: center;
		position: relative;
		top: -700px;
		height: 464px;
		width: 1112px;
	}

	.wheel-wrapper::before {
		content: '';
		z-index: 2;
		position: absolute;
		top: 555px;
		left: -78px;
		width: 543px;
		height: 575px;
		-webkit-transform: rotate(194deg);
		-ms-transform: rotate(194deg);
		transform: rotate(194deg);
		-webkit-backdrop-filter: blur(7px);
		backdrop-filter: blur(7px);
	}

	.wheel-wrapper::after {
		content: '';
		position: absolute;
		top: 547px;
		right: -103px;
		width: 584px;
		height: 575px;
		transform: rotate(76deg);
		backdrop-filter: blur(7px);
	}

	.wheelItems {
		height: 1112px;
		width: 1112px;
		border-radius: 100%;
		position: relative;
	}

	.inner-wheel {
		top: 800px;
	}
</style>
