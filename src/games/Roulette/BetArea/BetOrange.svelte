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

	$: bets = $currentBets['orange'];
	$: sum = sumBets(bets);
	$: isSpinning = $state ? $state.status === 'started' : false;
	const { send, fetching } = getGeneralContext();
</script>

<div class="bet-card">
	<div class="multiplier">
		<span class="number">15</span>
		<span class="amount">x</span>
	</div>
	<div class="content">
		<BackgroundButton
			background="orange"
			onClick={() => send({ type: 'BET', selections: [28] })}
			title="Place Bet"
			disabled={isSpinning || $fetching}
		/>
		<div class="info">
			<div class="players-in">
				<People color="orange" />
				<Text weight="semibold">{bets.length}</Text>
			</div>
			<div>
				<CryptoIcon type="USD" />
				<Text weight="semibold">${convertPenniesToDollars(sum, 2)}</Text>
			</div>
		</div>
		<Divider />
		<div class="h-auto pt-6 flex flex-col gap-2">
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
		@include bet-card('orange');
	}

	.card::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
		border-radius: 16px;
		background: radial-gradient(
			67.34% 78.69% at 29.44% -1.27%,
			#ff5c00 0%,
			rgba(255, 214, 0, 0) 100%
		);
		opacity: 0.15;
	}

	.multiplier-wrapper {
		top: -41px;
	}

	.multiplier-number {
		font-size: 88px;
		font-weight: bold;
		line-height: 1;
		background: -webkit-linear-gradient(#a8643e, #593a29);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.multiplier-amount {
		font-size: 40px;
		font-weight: bold;
		line-height: 1.45;
		background: -webkit-linear-gradient(#a8643e, #593a29);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
