<script lang="ts">
	import type { RouletteGame } from '$generated/graphql';
	import { animate, Motion, useMotionValue } from 'svelte-motion';
	import { state } from '../state/game';
	import Timer from './Timer.svelte';
	import WheelItem from './WheelItem.svelte';

	const ROULETTE_SPOTS = 38;
	const fragments = 360 / ROULETTE_SPOTS;

	const radToDeg = (rad: number) => rad * (180 / Math.PI);

	const thetaPositions = new Array(ROULETTE_SPOTS)
		.fill(0)
		.map((_, i) => (fragments / 180) * i * Math.PI);

	let rotate = useMotionValue(14);

	let animation = {};

	const anim = (state: RouletteGame) => {
		const rotation = radToDeg(thetaPositions[state.rollValue] + 0.08);
		animation = animate(rotate, rotation + 720, {
			type: 'tween',
			duration: 7.5,
			onComplete: () => {
				animation = {};
				rotate.set(rotation);
			}
		});
	};

	state.subscribe((currentState) => {
		if (!currentState) return;
		if (currentState.status === 'started') {
			anim(currentState);
		}
	});
</script>

<div class="wheel">
	<div class="wheel-wrapper">
		<div class="inner-wheel">
			<Timer />
		</div>
		<div class="tick" />
		<Motion let:motion style={{ rotate }}>
			<div class="wheel-items" use:motion>
				{#each thetaPositions as wheelSlot, index}
					<WheelItem position={wheelSlot} {index} />
				{/each}
			</div>
		</Motion>
	</div>
</div>

<style lang="scss">
	.wheel {
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
		justify-content: center;
		overflow: hidden;
	}

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

	.wheel-items {
		height: 1112px;
		width: 1112px;
		border-radius: 100%;
		position: relative;
	}

	.inner-wheel {
		top: 800px;
		position: absolute;
		width: auto;
		z-index: 10;
	}
</style>
