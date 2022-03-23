<script lang="ts">
	import { getGeneralContext } from '$games/state/setup';
	import { convertPenniesToDollars } from '$libs/currencyConversion';
	import { Avatar, CryptoIcon, Text } from '@csgamble-gg/nebula-ui';
	import Big from 'big.js';
	import { quintInOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import BackgroundButton from '../../../components/generics/BackgroundButton.svelte';
	import Divider from '../../../components/generics/Divider.svelte';
	import People from '../../../icons/svgs/People/People.svelte';
	import { currentBets, state, sumBets } from '../state/game';

	$: bets = $currentBets['purple'];
	$: sum = sumBets(bets);
	$: isSpinning = $state ? $state.status === 'started' : false;

	const { send, fetching } = getGeneralContext();
</script>

<div
	class="px-3 pb-4 relative flex flex-col rounded-large w-full card bet-card"
>
	<div class="multiplier">
		<span class="number">2</span>
		<span class="amount">x</span>
	</div>
	<div class="content">
		<BackgroundButton
			background="purple"
			onClick={() => {
				send({
					type: 'BET',
					selections: [
						0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 30, 32, 34,
						36, 38
					]
				});
			}}
			title="Place Bet"
			disabled={isSpinning || $fetching}
		/>
		<div class="info">
			<div>
				<People color="purple" />
				<Text weight="semibold">{bets.length}</Text>
			</div>
			<div>
				<CryptoIcon type="USD" />
				<Text weight="semibold">${convertPenniesToDollars(sum, 2)}</Text>
			</div>
		</div>
		<Divider />
		<div class="players">
			{#if bets.length === 0}
				<div />
			{:else}
				{#each bets as bet}
					<div class="player" transition:slide={{ easing: quintInOut }}>
						<Avatar image={bet.user.avatar} />
						<Text weight="semibold">{bet.user.displayName}</Text>
						<div class="bet">
							<CryptoIcon type={'BTC'} />
							<Text weight="semibold">
								{new Big(bet.amount).div(100).toFixed(2)}
							</Text>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	@use '_betting.scss';

	.bet-card {
		@include betting.bet-card('purple');
	}
</style>
