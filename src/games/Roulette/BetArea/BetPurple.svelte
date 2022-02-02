<script lang="ts">
	import Currency from '$components/Currency/Currency.svelte';
	import { getGeneralContext } from '$games/state/setup';
	import { convertPenniesToDollars } from '$libs/currencyConversion';
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

<div class="px-3 pb-4 relative flex flex-col rounded-large w-full card">
	<div class="absolute multiplier-wrapper">
		<span class="multiplier-number">2</span>
		<span class="multiplier-amount">x</span>
	</div>
	<div class="mt-8">
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
		<div class="flex py-4 gap-6">
			<div class="flex">
				<People color="purple" />
				<span class="text-white font-semibold pl-3">{bets.length}</span>
			</div>
			<div class="flex items-center">
				<div class="w-5 h-5">
					<Currency />
				</div>
				<span class="text-white font-semibold pl-3"
					>{convertPenniesToDollars(sum, 2)}</span
				>
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
								<Currency type={bet.currency} />
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

<style>
	.card {
		min-width: 140px;
		max-width: 495px;
		background: linear-gradient(
			180deg,
			#181d2d 0%,
			rgba(24, 29, 45, 0.4) 100%
		);
		z-index: 1;
		max-height: 600px;
	}

	.card::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
		border-radius: 16px;
		background: radial-gradient(
			67.34% 78.69% at 29.44% -1.27%,
			#ca2fb8 0%,
			rgba(202, 47, 184, 0) 100%
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
		background: -webkit-linear-gradient(#a34f81, #542761);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.multiplier-amount {
		font-size: 40px;
		font-weight: bold;
		line-height: 1.45;
		background: -webkit-linear-gradient(#a34f81, #542761);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
