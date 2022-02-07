<script lang="ts">
	import Currency from '$components/Currency/Currency.svelte';
	import BackgroundButton from '$components/generics/BackgroundButton.svelte';
	import { amount } from './state/general';
</script>

<div class="flex flex-col rounded-large bet-input relative">
	<div class="flex w-full items-center flex-nowrap gap-x-2">
		<div class="flex gap-3">
			<button
				class="bet-amount-button"
				type="button"
				on:click={() => amount.add(1)}
			>
				+1
			</button>
			<button
				class="bet-amount-button"
				type="button"
				on:click={() => amount.add(10)}
			>
				+10
			</button>
			<button
				class="bet-amount-button hidden md:inline"
				type="button"
				value="x2"
				on:click={() => amount.double()}
			>
				x2
			</button>
			<button
				class="bet-amount-button hidden md:inline"
				type="button"
				value="MAX"
				on:click={() => amount.max()}
			>
				MAX
			</button>
		</div>

		<div class="bet-amount-input flex gap-x-2 items-center h-full px-4">
			<div class="w-6 h-6">
				<Currency />
			</div>
			<input
				class="bg-transparent text-white placeholder:text-white font-semibold w-full"
				type="number"
				bind:value={$amount}
				placeholder="0.00"
			/>
		</div>
		<div class="w-full">
			<BackgroundButton
				onClick={() => {}}
				background="orange"
				title="Place Bet"
				disabled={false}
			/>
		</div>
	</div>
</div>

<style>
	.bet-amount-input {
		border: 1px solid rgba(75, 101, 139, 0.3);
		box-shadow: inset 1px 1px 0px rgba(58, 113, 194, 0.15);
		filter: drop-shadow(0px 14px 21px rgba(0, 0, 0, 0.07));
		border-radius: 6px;
		max-width: 30%;
	}
	.bet-input {
		background: radial-gradient(
				48.42% 387.61% at 88.24% 214.96%,
				rgba(94, 209, 225, 0.15) 0%,
				rgba(16, 128, 233, 0) 100%
			),
			linear-gradient(
				rgba(34, 40, 64, 0.12) 0%,
				rgba(61, 73, 118, 0.15) 100%
			);
		padding: 20px 15px;
		backdrop-filter: blur(80px);
	}

	.bet-amount-button {
		background: rgba(58, 87, 132, 0.15);
		box-shadow: rgba(0, 0, 0, 0.07) 0 14px 21px,
			rgba(58, 113, 194, 0.15) 1px 1px 0 inset;
		border-radius: 6px;
		border: none;
		height: 48px;
		width: 78px;
		color: white;
		font-weight: 700;
		font-family: Poppins;
		cursor: pointer;
		font-size: 13.33px;
	}
</style>
