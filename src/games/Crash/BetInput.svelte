<script lang="ts">
	import BackgroundButton from '$components/generics/BackgroundButton.svelte';
	import { getGeneralContext } from '$games/state/setup';
	import { state } from './state/game';
	import { amount } from './state/general';

	const { send, machineState, fetching } = getGeneralContext();

	$: canCashout = $state?.status === 'in-progress';
</script>

<div class="bet-input">
	<div class="">
		<div class="">
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

		<div class="bet-amount-input">
			<div class="">
				<!-- <Currency /> -->
			</div>
			<input
				class=""
				type="number"
				bind:value={$amount}
				placeholder="0.00"
			/>
		</div>
		<div class="w-full">
			<BackgroundButton
				onClick={canCashout
					? () => send({ type: 'CASHOUT' })
					: () => send({ type: 'BET' })}
				background="orange"
				title={canCashout ? 'Cashout' : 'Place Bet'}
				disabled={$fetching}
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
