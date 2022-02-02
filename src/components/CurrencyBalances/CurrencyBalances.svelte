<script lang="ts">
	import Currency from '$components/Currency/Currency.svelte';
	import { Caret } from '$icons/svgs';
	import { currency } from '$stores/currency/currency';
	import { rawWallets } from '$stores/wallets';
	import { CurrencyEnum } from '$types/index';
	import { formatCurrency } from '$utils/currency';
	import { createPopper, Instance as Popper } from '@popperjs/core';
	import { onDestroy, onMount } from 'svelte';

	const currencyList = Object.keys(CurrencyEnum) as CurrencyEnum[];

	$: balances = currencyList.map((currency) => {
		const { balance } = $rawWallets[currency];
		const formattedValue = formatCurrency(balance);
		return {
			currency,
			balance: formattedValue
		};
	});

	$: selectedCurrency = $currency;

	$: inPlayCurrency = balances.find(
		(currency) => currency.currency === selectedCurrency
	);

	let dropdownButton: HTMLButtonElement;
	let dropdown: HTMLDivElement;
	let popper: Popper;

	let isDropdownVisible = false;

	onMount(() => {
		popper = createPopper(dropdownButton, dropdown, {
			strategy: 'fixed',
			modifiers: [
				{
					name: 'offset',
					options: {
						offset: [0, 8]
					}
				}
			]
		});

		return () => popper.destroy();
	});

	onDestroy(() => {
		if (popper) popper.destroy();
	});

	const toggleDropdown = () => {
		if (isDropdownVisible) {
			dropdown.removeAttribute('data-show');
			isDropdownVisible = false;
		} else {
			dropdown.setAttribute('data-show', '');
			popper.update();
			isDropdownVisible = true;
		}
	};

	const changeInPlayCurrency = (currentCurrency: CurrencyEnum) => {
		currency.set(currentCurrency);
		toggleDropdown();
	};
</script>

<div class="flex flex-col">
	<button
		class="bg-darkBlue rounded-l text-white font-medium flex justify-center items-center px-3 h-[48px] gap-x-2"
		aria-describedby="dropdown"
		bind:this={dropdownButton}
		on:click={toggleDropdown}
	>
		<span>${inPlayCurrency.balance}</span>
		<div class="w-[20px] h-[20px]">
			<Currency type={inPlayCurrency.currency} />
		</div>
		<div class="-rotate-90">
			<Caret />
		</div>
	</button>
	<div
		id="dropdown"
		bind:this={dropdown}
		role="tooltip"
		class="flex flex-col bg-darkBlue"
	>
		{#each balances as { currency, balance }}
			<button
				class="flex m-0 px-2 py-4 hover:bg-foreground w-full"
				on:click={() => changeInPlayCurrency(currency)}
			>
				<span class="flex flex-row w-full">
					<span class="w-3/4 text-left">${balance}</span>
					<div class="flex gap-x-2">
						<span>{currency.toUpperCase()}</span>
						<div class="w-[20px] h-[20px]">
							<Currency type={currency} />
						</div>
					</div>
				</span>
			</button>
		{/each}
	</div>
</div>

<style>
	#dropdown {
		display: none;
		color: white;
		font-weight: bold;
		/* padding: 4px 8px; */
		font-size: 13px;
		border-radius: 4px;
		width: 150px;
		z-index: 9999;
	}
	:global(#dropdown[data-show]) {
		display: block;
	}
</style>
