<script lang="ts">
	import { getGeneralContext } from '$games/state/setup';
	import { convertPenniesToDollars } from '$libs/currencyConversion';
	import { CryptoIcon, Text } from '@csgamble-gg/nebula-ui';
	import Big from 'big.js';
	import { quintInOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import BackgroundButton from '../../../components/generics/BackgroundButton.svelte';
	import Divider from '../../../components/generics/Divider.svelte';
	import People from '../../../icons/svgs/People/People.svelte';
	import { currentBets, state, sumBets } from '../state/game';

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
		<div class="h-auto pt-6 flex-col gap-2 hidden sm:flex">
			{#if bets.length === 0}
				<div />
			{:else}
				{#each bets as bet}
					<div
						class="flex items-center"
						transition:slide={{ easing: quintInOut }}
					>
						<img
							class="rounded mr-3"
							src={bet.user.avatar}
							width="40px"
							height="40px"
							alt="user avatar"
							loading="eager"
						/>
						<span
							class="text-white font-semibold text-ellipsis overflow-hidden"
							>{bet.user.displayName}</span
						>
						<div class="flex flex-grow justify-end gap-2">
							<div class="w-6 h-6">
								<!-- <Currency type={bet.currency} /> -->
							</div>
							<span class="text-white font-semibold"
								>{new Big(bet.amount).div(100).toFixed(2)}</span
							>
						</div>
					</div>
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
