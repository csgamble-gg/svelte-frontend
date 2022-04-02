<script lang="ts">
	import { CurrencyEnum } from '$generated/graphql';
	import { currency } from '$stores/currency/currency';
	import { rawWallets } from '$stores/wallets';
	import { formatCurrency } from '$utils/currency';
	import { getCrytpoIcon } from '$utils/getCryptoIcon';
	import { SelectInput } from '@csgamble-gg/nebula-ui';
	import { map, toUpper } from 'lodash-es';

	const currencyList = Object.keys(CurrencyEnum) as CurrencyEnum[];

	// $: balances = currencyList.map((currency) => {
	// 	// TODO FIX THIS
	// 	if (!$rawWallets[currency]) {
	// 		return {
	// 			currency,
	// 			balance: 0
	// 		};
	// 	}
	// 	const { balance } = $rawWallets[currency];
	// 	const formattedValue = formatCurrency(balance);
	// 	return {
	// 		currency,
	// 		balance: formattedValue
	// 	};
	// });

	$: balances = map($rawWallets, (wallet) => {
		const formattedValue = formatCurrency(wallet.balance);

		return {
			currency: wallet.type,
			balance: formattedValue
		};
	});

	$: selectedCurrency = $currency;

	$: inPlayCurrency = balances.find(
		(currency) => currency.currency === selectedCurrency
	);

	const changeInPlayCurrency = (event: CustomEvent<any>) => {
		currency.set(event.detail.label);
	};

	$: options = balances.map((balance) => ({
		label: toUpper(balance.currency),
		value: balance.balance,
		icon: getCrytpoIcon(toUpper(balance.currency))
	}));
</script>

<div class="currency-balances">
	<SelectInput
		{options}
		value={inPlayCurrency.currency}
		on:change={changeInPlayCurrency}
	/>
</div>

<style>
	.currency-balances {
		min-width: 138px;
	}
</style>
