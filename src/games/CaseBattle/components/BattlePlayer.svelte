<script lang="ts">
	import SkinCard from '$components/SkinCard/SkinCard.svelte';
	import { getGeneralContext } from '$games/state/setup';
	import { BattleStatus, User } from '$generated/graphql';
	import { Avatar, Button, Card, Text } from '@csgamble-gg/nebula-ui';
	import { currentBattle } from '../state/game';
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

	let winningItem = null;
	let totalWinningValue = null;
	let playerRoundData = null;

	$: battleRunning = $currentBattle.status === BattleStatus.Started;

	$: if (player) {
		playerRoundData = $currentBattle.rounds.flatMap((round) =>
			round.drops.filter((drop) => drop.playerId === player._id)
		);

		let currentRunningRound = playerRoundData.find(
			(round) => round.roundNumber !== $currentBattle.currentRound
		);

		totalWinningValue =
			playerRoundData?.reduce((acc, cur) => {
				return cur?.winningSkin ? acc + cur.winningSkin.price : 0;
			}, 0) || 0;

		if (currentRunningRound.winningSkin) {
			winningItem = currentRunningRound.winningSkin;
		}
	}

	// $: totalWinningAmount = playerRoundData.reduce((acc, cur) => {
	// 	return cur. ? acc + cur.winningSkin.price : 0;
	// }, 0);

	// $: totalWinningAmount = $currentBattle.rounds.reduce((acc, cur) => {
	// 	return acc + cur.winningSkin.price;
	// }, 0);
</script>

<div class="player">
	<div class="reel-wrapper">
		{#if winningItem}
			<Reel
				caseSkins={$currentBattle.rounds[$currentBattle.currentRound - 1]
					.case.items}
				{winningItem}
			/>
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
			{#if playerRoundData}
				{#each playerRoundData as round, index}
					<Card fullWidth>
						<div class="round-winnings placeholder">
							{#if playerRoundData[index].winningSkin}
								<SkinCard skin={playerRoundData[index].winningSkin} />
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
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		// grid-template-columns: repeat(auto-fill, 191px);
		gap: 46px;
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
