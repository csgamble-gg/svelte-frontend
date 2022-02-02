import { currency } from '$stores/currency/currency';
import { rawWallets } from '$stores/wallets';
import { formatCurrency } from '$utils/currency';
import { get, writable } from 'svelte/store';

export function create() {
	const amount = (() => {
		const store = writable(formatCurrency(0));

		const changeAmount = (value: number) => {
			store.set(formatCurrency(value));
		};

		const max = () => {
			const selectedCurrency = get(currency);
			const wallet = get(rawWallets)[selectedCurrency];

			store.set(formatCurrency(wallet.balance));
		};

		return {
			...store,
			changeAmount,
			max
		};
	})();

	return {
		amount
	};
}
