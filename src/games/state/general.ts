import { currency as currencyStore } from '$stores/currency/currency';
import { rawWallets } from '$stores/wallets';
import { formatPennies } from '$utils/currency';
import { doubleBet } from '$utils/formatting';
import Big from 'big.js';
import { derived, get, Readable, Writable, writable } from 'svelte/store';
import type { StateValue } from 'xstate';
import { matchesState } from 'xstate';

export function create(): {
	machineState: Writable<StateValue>;
	fetching: Readable<boolean>;
	amount: {
		change: ({ amount }: { amount: number }) => void;
		add: (amount: number) => void;
		double: () => void;
		max: () => void;
		reset: () => void;
	};
	currency: typeof currencyStore;
} {
	const machineState = writable<StateValue>('');

	const fetching = derived(machineState, (state) =>
		matchesState('betting.fetching', state)
	);

	const amount = (() => {
		const store = writable(formatPennies(0));

		return {
			...store,
			change: ({ amount: $amount }: { amount: number }) => {
				store.set(formatPennies($amount));
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

				store.set(formatPennies(currentWallet.balance));
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
