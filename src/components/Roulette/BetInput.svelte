<script lang="ts">
	import Gem from '../../icons/svgs/Gem/Gem.svelte';
	import { betAmount } from './Roulette.context';

	function handleClick(e) {
		const value = parseInt(e.target.value);
		if (value > 0) {
			$betAmount = $betAmount + value;
		}
		if (e.target.value === 'x2') {
			betAmount.set(betAmount * 2);
		}
		if (e.target.value === 'MAX') {
			$betAmount = $betAmount;
		}
	}
</script>

<div class="flex flex-col rounded-large bet-input">
	<div class="flex w-full align-center flex-nowrap">
		<div class="flex flex-col flex-nowrap">
			<span class="text-lightblue text-sm">Bet Amount</span>

			<span class="flex flex-row align-center items-center">
				<Gem class="mr-2" color="green" />
				<input
					bind:value={$betAmount}
					type="number"
					placeholder="0.00"
					class="border-none outline-none bg-transparent text-white placeholder:text-white font-semibold"
				/>
			</span>
		</div>
		<div class="absolute overflow-hidden w-auto right-4">
			<div class="mx-2">
				<button type="button" class="bet-amount-button" value={1} on:click={handleClick}>+1</button>
				<button type="button" class="bet-amount-button" value={10} on:click={handleClick}
					>+10</button
				>
				<button type="button" class="bet-amount-button" value={100} on:click={handleClick}
					>+100</button
				>
				<button type="button" class="bet-amount-button" value="x2" on:click={handleClick}>x2</button
				>
				<button type="button" class="bet-amount-button" value="MAX" on:click={handleClick}
					>MAX</button
				>
			</div>
		</div>
	</div>
</div>

<style>
	.bet-input {
		background: radial-gradient(
				48.42% 387.61% at 88.24% 214.96%,
				rgba(94, 209, 225, 0.15) 0%,
				rgba(16, 128, 233, 0) 100%
			),
			linear-gradient(rgba(34, 40, 64, 0.12) 0%, rgba(61, 73, 118, 0.15) 100%);
		padding: 20px 15px;
	}

	.bet-amount-button {
		background: rgba(58, 87, 132, 0.15);
		box-shadow: rgba(0, 0, 0, 0.07) 0 14px 21px, rgba(58, 113, 194, 0.15) 1px 1px 0 inset;
		border-radius: 6px;
		border: none;
		height: 48px;
		width: 78px;
		margin: 0 5px 0 0;
		color: white;
		font-weight: 700;
		font-family: Poppins;
		cursor: pointer;
		font-size: 13.33px;
	}
</style>
