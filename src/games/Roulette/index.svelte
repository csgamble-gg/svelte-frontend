<script lang="ts">
	import { setConfigContext, setup } from '$games/state/setup';
	import { onMount } from 'svelte';
	import BettingArea from './BetArea/BettingArea.svelte';
	import { config } from './config';
	import { service } from './machine/index';
	import RecentRolls from './RecentRolls.svelte';
	import * as general from './state/general';
	import { initialize } from './subscriptionHandler';
	import Wheel from './Wheel/Wheel.svelte';

	onMount(() => {
		let { unsubscribe } = initialize();

		return () => unsubscribe();
	});

	setConfigContext(config);

	setup({
		generalContext: {
			...general,
			send: service.send
		}
	});
</script>

<div class="roulette-wrapper">
	<div class="content">
		<div class="absolute left-0 pt-9 pl-10 z-10">
			<div class="mb-4">
				<h1 class="text-white text-4xl font-bold mb-3">Roulette</h1>
				<span class="text-lightblue">History</span>
			</div>
			<RecentRolls />
		</div>
		<Wheel />
		<BettingArea />
	</div>
</div>

<style>
	.roulette-wrapper {
		display: flex;
		flex-direction: column;
		width: 100%;
		border-radius: 24px;
		height: 100%;
		border: 1px solid #1a1f31;
		position: relative;
		background: no-repeat center center;
		z-index: 1;
		overflow: hidden;
	}

	.roulette-wrapper::before {
		content: '';
		position: absolute;
		inset: 0;
		height: 100%;
		width: 100%;
		opacity: 0.4;
		z-index: -1;
		background: url('/assets/StarBackground.png');
	}

	.content {
		display: flex;
		flex-direction: column;
		max-width: 1700px;
		align-self: center;
		width: 100%;
	}
</style>
