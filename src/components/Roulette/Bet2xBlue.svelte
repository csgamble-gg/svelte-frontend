<script lang="ts">
	import BackgroundButton from '../generics/BackgroundButton.svelte';
	import People from '../../icons/svgs/People/People.svelte';
	import Divider from '../generics/Divider.svelte';
	import OpaqueGem from '../../icons/svgs/Gem/OpaqueGem.svelte';
	import { slide } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';

	import { mutation } from '@urql/svelte';
	import { CreateBetDocument, CreateBetMutation } from '../../generated/graphql';
	import { betAmount, rouletteContext, sumBets } from './Roulette.context';
	import Big from 'big.js';
	import { convertPenniesToDollars } from '../../libs/convertToPennies.ts';

	const createBet = mutation<CreateBetMutation>({
		query: CreateBetDocument
	});

	async function handleCreateBet() {
		await createBet({
			input: {
				betAmount: $betAmount,
				gameId: $rouletteContext.game.gameId,
				selections: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37]
			}
		}).then(({ data }) => {
			if (!data) return;
			if (!data.createBet.success) {
			}
		});
	}

	$: bets = $rouletteContext.currentBets['blue'];
	$: sum = sumBets(bets);
	$: isSpinning = $rouletteContext.game ? $rouletteContext.game.status === 'started' : false;
</script>

<div class="px-3 pb-4 relative flex flex-col rounded-large w-full card">
	<div class="absolute multiplier-wrapper">
		<span class="multiplier-number">2</span>
		<span class="multiplier-amount">x</span>
	</div>
	<div class="mt-8">
		<BackgroundButton
			background="blue"
			onClick={handleCreateBet}
			title="Place Bet"
			disabled={isSpinning}
		/>
		<div class="flex py-4 gap-6">
			<div class="flex">
				<People color="blue" />
				<span class="text-white font-semibold pl-3">{bets.length}</span>
			</div>
			<div class="flex">
				<OpaqueGem color="blue" />
				<span class="text-white font-semibold pl-3">{convertPenniesToDollars(sum, 2)}</span>
			</div>
		</div>
		<Divider />
		<div class="h-auto pt-6 flex flex-col gap-2">
			{#if bets.length === 0}
				<div />
			{:else}
				{#each bets as bet}
					<div class="flex items-center" transition:slide={{ easing: quintInOut }}>
						<img
							class="rounded mr-3"
							src={bet.user.avatar}
							width="40px"
							height="40px"
							alt="user avatar"
							loading="eager"
						/>
						<span class="text-white font-semibold text-ellipsis overflow-hidden"
							>{bet.user.displayName}</span
						>
						<div class="flex flex-grow justify-end gap-2">
							<OpaqueGem color="blue" />
							<span class="text-white font-semibold">{new Big(bet.amount).div(100).toFixed(2)}</span
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
		background: linear-gradient(180deg, #181d2d 0%, rgba(24, 29, 45, 0.4) 100%);
		z-index: 1;
		max-height: 600px;
	}

	.card::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
		border-radius: 16px;
		opacity: 0.15;
		background: radial-gradient(
			67.34% 78.69% at 29.44% -1.27%,
			#55fcc0 0%,
			rgba(0, 117, 255, 0) 100%
		);
	}

	.multiplier-wrapper {
		top: -41px;
	}

	.multiplier-number {
		font-size: 88px;
		font-weight: bold;
		line-height: 1;
		background: -webkit-linear-gradient(#32937b, #25464f);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.multiplier-amount {
		font-size: 40px;
		font-weight: bold;
		line-height: 1.45;
		background: -webkit-linear-gradient(#32937b, #25464f);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
