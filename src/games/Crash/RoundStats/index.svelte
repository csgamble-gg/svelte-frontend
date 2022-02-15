<script>
	import Currency from '$components/Currency/Currency.svelte';
	import { convertPenniesToDollars } from '$libs/currencyConversion';
	import sumArrayNumber from '$utils/sumArrayNumber';
	import { cashedIn, cashedOut } from '../state/game';
</script>

<div>
	<div class="round-stats pt-8">
		<div class="flex items-center justify-between pb-6 px-6">
			<h2 class="text-white text-xl font-bold">Round Stats</h2>
			<div class="flex">
				<span class="text-lightblue opacity-70 pr-1">Total Bets:</span>
				<span class="text-lightblue"
					>${convertPenniesToDollars(sumArrayNumber($cashedIn), 2)}</span
				>
			</div>
		</div>
		{#each $cashedIn as bet, i}
			<div
				class="flex px-6 py-4 items-center relative"
				style:background={i % 2 ? '#21283F' : 'transparent'}
			>
				<img
					class="rounded mr-4"
					width="40px"
					height="40px"
					alt="user profile avatar"
					src={bet.user.avatar}
				/>
				<div
					class="flex bg-cover bg-center w-14 h-10 border-2 border-lightblue/10 rounded-md mr-3 items-center justify-center"
				>
					<div class="w-6 h-6">
						<Currency type={bet.currency} />
					</div>
				</div>
				<div class="flex flex-col gap-y-0.5 mr-4">
					<span class="text-lightblue text-xs opacity-70">Deposit</span>
					<span class="text-white text-xs font-bold"
						>${convertPenniesToDollars(bet.amount, 2)}</span
					>
				</div>
				<div
					class="flex bg-cover bg-center w-14 h-10 border-2 border-lightblue/10 rounded-md mr-3"
				/>
				<div class="flex flex-col gap-y-0.5 mr-4">
					<span class="text-lightblue text-xs opacity-70">Won</span>
					<span class="text-white text-xs font-bold"
						>{bet.totalWin ? bet.totalWin : ''}</span
					>
				</div>
				<span
					class="multiplier-box text-brown font-bold flex items-center justify-center text-xs"
				>
					LIVE
				</span>
				<div class="border-block" />
			</div>
		{/each}
		{#each $cashedOut as bet, i}
			<div
				class="flex px-6 py-4 items-center relative"
				style:background={i % 2 ? '#21283F' : 'transparent'}
			>
				<img
					class="rounded mr-4"
					width="40px"
					height="40px"
					alt="user profile avatar"
					src={bet.user.avatar}
				/>
				<div class="w-6 h-6 mr-3">
					<Currency type={bet.currency} />
				</div>
				<div class="flex flex-col gap-y-0.5 mr-4">
					<span class="text-white text-sm font-bold"
						>${convertPenniesToDollars(bet.amount, 2)}</span
					>
				</div>
				<div class="flex flex-col gap-y-0.5 mr-4 ml-auto">
					<span class="text-white text-xs font-bold"
						>{bet.totalWin ? bet.totalWin : ''}</span
					>
				</div>
				<span
					class="multiplier-box text-brown font-bold flex items-center justify-center text-xs"
				>
					{bet.payoutMultiplier.toFixed(2)}x
				</span>
				<div class="border-block" />
			</div>
		{/each}
	</div>
</div>

<style>
	.round-stats {
		height: 750px;
		min-width: 420px;
		background: linear-gradient(
			180deg,
			#181d2d 0%,
			rgba(24, 29, 45, 0.69) 100%
		);
		box-shadow: inset 1px 1px 0 rgba(73, 86, 130, 0.12);
		border-radius: 16px;
	}

	.multiplier-box {
		width: 51px;
		height: 28px;
		background: linear-gradient(
			321.77deg,
			#ffeb71 -4.42%,
			#eac76c 50.67%,
			rgba(218, 194, 94, 0.69) 102.42%
		);
		border-radius: 6px;
	}

	.border-block {
		height: 28px;
		width: 2px;
		background: linear-gradient(
			0deg,
			#ffeb71 0%,
			#eac76c 51.56%,
			rgba(218, 194, 94, 0.69) 100%
		);
		position: absolute;
		right: 0;
	}
</style>
