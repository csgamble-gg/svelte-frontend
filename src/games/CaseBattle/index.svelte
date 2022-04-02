<script lang="ts">
	export let battle: Battle;

	import GameContainer from '$components/GameContainer/GameContainer.svelte';
	import { setup } from '$games/state/setup';
	import { Battle, BattleStatus } from '$generated/graphql';
	import { convertPenniesToDollars } from '$libs/currencyConversion';
	import { Text } from '@csgamble-gg/nebula-ui';
	import { onDestroy, onMount } from 'svelte';
	import BattlePlayer from './components/BattlePlayer.svelte';
	import CaseCard from './components/CaseCard.svelte';
	import Reel from './components/Reel.svelte';
	import { service } from './machine';
	import { currentBattle } from './state/game';
	import * as general from './state/general';
	import { initialize } from './subscriptionHandler';

	currentBattle.set(battle);

	onMount(() => {
		initialize();
	});

	onDestroy(() => {
		currentBattle.set(null);
	});

	setup({
		generalContext: {
			...general,
			send: service.send
		}
	});

	const rounds = new Array($currentBattle.rounds).fill(null);
</script>

<GameContainer>
	<div class="header">
		<div class="round-counter">
			<div class="numbers">
				<Text tag="h2" size="3xl" variant="yellowGradient">Round</Text>
				<div>
					<Text size="3xl" weight="semibold"
						>{$currentBattle.currentRound}</Text
					>
					<Text size="lg" variant="yellowGradient" weight="semibold"
						>of</Text
					>
					<Text size="3xl" weight="semibold">{$currentBattle.rounds}</Text>
				</div>
			</div>
			<div class="rounds">
				{#each rounds as round, index}
					{@const roundNum = index + 1}
					<div
						class="round-dot"
						class:done={$currentBattle.currentRound > roundNum}
						class:active={$currentBattle.currentRound === roundNum}
					/>
				{/each}
			</div>
		</div>
		<div class="battle-info">
			<Text variant="subtle">Total Cost</Text>
			<Text weight="semibold"
				>$ {convertPenniesToDollars($currentBattle.price)}</Text
			>
		</div>
	</div>
	<div class="players-wrapper">
		<div class="case">
			<CaseCard box={$currentBattle.cases[0]} />
		</div>
		<div class="players">
			<BattlePlayer
				{rounds}
				position="left"
				player={$currentBattle.players[0]}
			>
				{#if $currentBattle.status === BattleStatus.Started}
					<Reel slots={$currentBattle.cases[0].slots} />
				{/if}
			</BattlePlayer>
			<BattlePlayer
				{rounds}
				position="right"
				player={$currentBattle.players[1]}
			>
				{#if $currentBattle.status === BattleStatus.Started}
					<Reel slots={$currentBattle.cases[0].slots} />
				{/if}
			</BattlePlayer>
		</div>
	</div>
</GameContainer>

<style lang="scss">
	@use 'sass:color' as color;
	@use '../../styles/breakpoints' as *;

	$activeBackground: linear-gradient(
		321.77deg,
		#ffeb71 -4.42%,
		#eac76c 50.67%,
		rgba(218, 194, 94, 0.69) 102.42%
	);

	$background: #9cbbff;

	.battle {
		height: 100%;
	}
	.header {
		display: flex;
		flex-direction: column;
		align-self: center;

		.round-counter {
			display: flex;
			flex-direction: column;
			align-items: center;
			.numbers {
				gap: 24px;
				display: flex;
			}
		}

		.rounds {
			margin: 27px 0 0;
			display: flex;
			gap: 9px;
			.round-dot {
				width: 12px;
				height: 12px;
				border-radius: 24px;
				background-color: color.adjust($color: $background, $alpha: -0.7);
				transition: all 0.2s ease-in-out;
				&.done {
					background: $activeBackground;
					opacity: 0.5;
				}

				&.active {
					width: 22px;
					background: $activeBackground;
				}
			}
		}

		.battle-info {
			margin: 31px;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 13px;
		}
	}

	.players-wrapper {
		margin: 47px 0 0;
		position: relative;
		display: flex;
		flex-direction: column;

		.case {
			position: absolute;
			top: 0;
			left: 50%;
			transform: translate(-50%, -0%);
			width: fit-content;
			z-index: 555;
		}

		.players {
			margin: 50px 0 0;
			position: relative;
			display: flex;
			gap: 30px;
		}

		@include break-at('mobile') {
			.players {
				gap: 5px;
			}

			.case {
				transform: translate(-50%, 25%);
			}
		}
	}
</style>
