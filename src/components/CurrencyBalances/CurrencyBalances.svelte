<script lang="ts">
	import { currency } from '$stores/currency/currency';
	import { rawWallets } from '$stores/wallets';
	import { CurrencyEnum } from '$types/index';
	import { formatCurrency } from '$utils/currency';
	import { getCrytpoIcon } from '$utils/getCryptoIcon';
	import { SelectInput } from '@csgamble-gg/nebula-ui';
	import { toUpper } from 'lodash-es';

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

	const changeInPlayCurrency = (currentCurrency: CurrencyEnum) => {
		currency.set(currentCurrency);
	};

	$: options = balances.map((balance) => ({
		label: toUpper(balance.currency),
		value: balance.balance,
		icon: getCrytpoIcon(toUpper(balance.currency))
	}));
</script>

<div class="currency-balances">
	<SelectInput {options} value="BTC" />
</div>

<style>
	.currency-balances {
		min-width: 138px;
	}
</style>
