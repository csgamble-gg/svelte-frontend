import { currency as currencyStore } from '$stores/currency/currency';
import { rawWallets } from '$stores/wallets';
import { formatCurrency } from '$utils/currency';
import { doubleBet } from '$utils/formatting';
import Big from 'big.js';
import { derived, get, writable } from 'svelte/store';
import type { StateValue } from 'xstate';
import { matchesState } from 'xstate';

export function create<GameState extends {}>() {
	const machineState = writable<StateValue>('');

	const fetching = derived(machineState, (state) =>
		matchesState('betting.fetching', state)
	);

	const amount = (() => {
		const store = writable(formatCurrency(0));

		return {
			...store,
			change: ({ amount: $amount }: { amount: number }) => {
				store.set(formatCurrency($amount));
			},
			add: (amount: number) => {
				const newNum = new Big(get(store)).plus(amount).toFixed(2);
				store.set(newNum);
			},
			double: () => {
				store.update((prev) => doubleBet(prev));
			},
			max: () => {
				const selectedCurrency = get(currencyStore);
				const currentWallet = get(rawWallets)[selectedCurrency];

				store.set(formatCurrency(currentWallet.balance));
			},
			reset: () => {
				store.set(null);
			}
		};
	})();

	return {
		amount,
		currency: currencyStore,
		fetching,
		machineState
	};
}
