<script lang="ts">
	import { getGeneralContext } from '$games/state/setup';
	import { convertPenniesToDollars } from '$libs/currencyConversion';
	import { CryptoIcon, Text } from '@csgamble-gg/nebula-ui';
	import BackgroundButton from '../../../components/generics/BackgroundButton.svelte';
	import Divider from '../../../components/generics/Divider.svelte';
	import People from '../../../icons/svgs/People/People.svelte';
	import { currentBets, state, sumBets } from '../state/game';
	import PlayerBet from './PlayerBet.svelte';

	$: bets = $currentBets['blue'];
	$: sum = sumBets(bets);
	$: isSpinning = $state ? $state.status === 'started' : false;

	const { send, fetching } = getGeneralContext();
</script>

<div class="bet-card">
	<div class="multiplier">
		<span class="number">2</span>
		<span class="amount">x</span>
	</div>
	<div class="content">
		<BackgroundButton
			background="blue"
			onClick={() =>
				send({
					type: 'BET',
					selections: [
						1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33,
						35, 37
					]
				})}
			title="Place Bet"
			disabled={isSpinning || $fetching}
		/>
		<div class="info">
			<div>
				<People color="blue" />
				<Text weight="semibold">{bets.length}</Text>
			</div>
			<div>
				<CryptoIcon type="USD" />
				<Text weight="semibold">${convertPenniesToDollars(sum, 2)}</Text>
			</div>
		</div>
		<Divider />
		<div class="bets-wrapper">
			{#if bets.length === 0}
				<div />
			{:else}
				{#each bets as bet}
					<PlayerBet {bet} />
				{/each}
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	@use '_betting.scss' as *;

	.bet-card {
		@include bet-card('blue');
	}
</style>
