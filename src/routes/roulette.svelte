<script lang="ts">
	import Wheel from '../components/Roulette/Wheel.svelte';
	import RecentRolls from '../components/Roulette/RecentRolls.svelte';
	import { operationStore, query, subscription } from '@urql/svelte';
	import {
		GetLatestGameDocument,
		RouletteGameCreatedDocument,
		RouletteGameCreatedSubscription,
		RouletteGameUpdatedDocument,
		RouletteGameUpdatedSubscription,
		GetLatestGameQuery
	} from '../generated/graphql.ts';
	import {
		updateRouletteGame,
		rouletteContext,
		groupRouletteBets,
		updateRouletteBets,
		resetBets
	} from '../components/Roulette/Roulette.context';
	import BettingArea from '../components/Roulette/BettingArea.svelte';
	import StarBackground from '../../static/assets/StarBackground.png';
	import { onMount } from 'svelte';

	const gameCreation = operationStore<RouletteGameCreatedSubscription>(RouletteGameCreatedDocument);
	const gameUpdated = operationStore<RouletteGameUpdatedSubscription>(RouletteGameUpdatedDocument);
	const recentGame = operationStore<GetLatestGameQuery>(
		GetLatestGameDocument,
		{
			input: {
				gameType: 'roulette'
			}
		},
		{ pause: $rouletteContext.game !== null, requestPolicy: 'network-only' }
	);

	const handleSubscription = (messages = [], data) => {
		if (data.rouletteGameCreated) {
			updateRouletteGame(data.rouletteGameCreated);
			resetBets();
			return data.rouletteGameCreated
		}
		if (data.rouletteGameUpdated) {
			updateRouletteGame(data.rouletteGameUpdated);
			return data.rouletteGameUpdated
		}
	};

	query(recentGame);
	subscription(gameCreation, handleSubscription);
	subscription(gameUpdated, handleSubscription);
	recentGame.subscribe(({ data }) => {
		if (data && data.getLatestGame) {
			if ($rouletteContext.game === null) {
				updateRouletteGame(data.getLatestGame.game);
				groupRouletteBets(data.getLatestGame.currentBets);
			}
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
