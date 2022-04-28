<script lang="ts">
	import SkinCard from '$components/SkinCard/SkinCard.svelte';
	import { getGeneralContext } from '$games/state/setup';
	import { BattleStatus, User } from '$generated/graphql';
	import { Avatar, Button, Card, Text } from '@csgamble-gg/nebula-ui';
	import { currentBattle, currentRound, playerWins } from '../state/game';
	import Reel from './Reel.svelte';

	export let position: 'left' | 'right';
	export let player:
		| Pick<User, '_id' | 'avatar' | 'displayName'>
		| undefined = undefined;
	const { send } = getGeneralContext();

	function handleJoinBattle() {
		send({
			type: 'JOIN_BATTLE',
			payload: {
				battleId: $currentBattle._id
			}
		});
	}

	let totalWinningValue = null;
	let allPlayersRounds = null;
	let currentPlayerRound = null;

	$: winningSkins = [];

	$: battleRunning = $currentBattle.status === BattleStatus.Started;

	$: if (player) {
		allPlayersRounds = $currentBattle.rounds.flatMap((round) =>
			round.drops.filter((drop) => drop.playerId === player._id)
		);

		currentPlayerRound = $currentRound
			? $currentRound.drops.find((drop) => drop.playerId === player._id)
			: null;

		// totalWinningValue =
		// 	playerWins?.reduce((acc, cur) => {
		// 		return cur?.winningSkin ? acc + cur.winningSkin.price : 0;
		// 	}, 0) || 0;

		totalWinningValue =
			$playerWins[player._id]?.reduce((acc, cur) => {
				return cur?.price ? acc + cur.price : 0;
			}, 0) || 0;

		winningSkins = $playerWins[player._id] || [];

		// if (currentRunningRound) {
		// 	winningItem = currentRunningRound.winningSkin;
		// }
	}

	// $: totalWinningAmount = playerRoundData.reduce((acc, cur) => {
	// 	return cur. ? acc + cur.winningSkin.price : 0;
	// }, 0);

	// $: totalWinningAmount = $currentBattle.rounds.reduce((acc, cur) => {
	// 	return acc + cur.winningSkin.price;
	// }, 0);

	$: totalWinningValue = 0;
</script>

<div class="player">
	<div class="reel-wrapper">
		{#if player}
			<Reel playerId={player._id} />
		{/if}
	</div>
	<Card fullWidth variant="gradient">
		<div class="player-items">
			{#if player}
				<div class="player-info {position}">
					<Card>
						<div class="info-wrapper {position}">
							<Avatar size="medium" image={player.avatar} />
							<div class="info {position}">
								<Text weight="semibold" size="lg"
									>{player.displayName}</Text
								>
								<Text weight="bold" variant="subtle"
									>${totalWinningValue.toFixed(2)}</Text
								>
							</div>
						</div>
					</Card>
				</div>
			{:else}
				<div class="player-info {position}">
					<Card>
						<div class="info-wrapper {position}">
							<Button label="Join Battle" on:click={handleJoinBattle} />
						</div>
					</Card>
				</div>
			{/if}
			{#if allPlayersRounds}
				{#each allPlayersRounds as round, index}
					<Card fullWidth>
						<div class="round-winnings placeholder">
							{#if winningSkins[index]}
								<SkinCard skin={winningSkins[index]} />
							{:else}
								<Text variant="yellowGradient" weight="bold" size="3xl"
									>{index + 1}</Text
								>
							{/if}
						</div>
					</Card>
				{/each}
			{/if}
		</div>
	</Card>
</div>

<style lang="scss">
	@use '../../../styles/breakpoints' as *;

	$DESKTOP_PADDING: 40px;
	$MOBILE_PADDING: 5px;

	$MOBILE_GAP: 10px;

	.reel-wrapper {
		height: 200px;
		display: flex;
	}

	.player {
		flex: 1;
	}

	.player-items {
		padding: 88px $DESKTOP_PADDING 57px;
		margin: 93px 0 0;
		position: relative;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
		gap: 20px;
		justify-content: center;

		.player-info {
			position: absolute;
			top: -50px;
			.info-wrapper {
				display: flex;
				gap: 15px;
				padding: 20px;
				&.left {
					flex-direction: row;
				}

				&.right {
					flex-direction: row-reverse;
				}

				.info {
					display: flex;
					flex-direction: column;
					justify-content: center;

					&.right {
						align-items: flex-end;
					}
				}
			}

			&.left {
				left: $DESKTOP_PADDING;
			}

			&.right {
				right: $DESKTOP_PADDING;
			}
		}

		.round-winnings {
			display: flex;
			align-items: center;
			justify-content: center;

			height: 236px;
			width: 100%;
		}

		@include break-at('mobile') {
			padding: 46px $MOBILE_PADDING 57px;
			gap: $MOBILE_GAP;

			.player-info {
				.info-wrapper {
					padding: 10px;
				}

				&.left {
					left: $MOBILE_PADDING;
				}

				&.right {
					right: $MOBILE_PADDING;
				}
			}
		}
	}
</style>
