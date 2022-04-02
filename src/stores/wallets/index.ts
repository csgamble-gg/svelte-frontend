import { browser } from '$app/env';
import type {
	CurrencyEnum as TCurrencyEnum,
	UserWallet,
	UserWalletsQuery
} from '$generated/graphql';
import { CurrencyEnum, UserWalletsDocument } from '$generated/graphql';
import { getClient } from '@urql/svelte';
import { mapValues } from 'lodash-es';
import { writable } from 'svelte/store';

type Balance = {
	balance: number;
};

export type Balances = Record<keyof typeof TCurrencyEnum, Balance>;

export type State = {
	balances: Balances;
};

export const rawWallets = (() => {
	const defaultBalances = mapValues(CurrencyEnum, (val) => ({
		balance: 0,
		type: val.toUpperCase()
	}));

	const transformToWallets = (userWallets: [UserWallet]): Balances => {
		return userWallets.reduce((acc, curr) => {
			acc[curr.type] = curr;
			return acc;
		}, {}) as Balances;
	};

	const initialValue = (() => {
		if (browser) {
			// const client = getClient();
		}
		return defaultBalances;
	})();

	const walletStore = writable<Balances>(initialValue);

	const updateWalletBalance = (balance: {
		currency: CurrencyEnum;
		amount: number;
	}) => {
		walletStore.update((currentValue) => ({
			...currentValue,
			[balance.currency]: {
				...currentValue[balance.currency],
				balance: balance.amount
			}
		}));
	};

	const fetch = async () => {
		const client = getClient();

		const value = await client
			.query<UserWalletsQuery>(
				UserWalletsDocument,
				{},
				{ requestPolicy: 'network-only' }
			)
			.toPromise();

		const wallets = value.data.userWallets;

		if (wallets) {
			walletStore.update((currentValue) => ({
				...currentValue,
				...transformToWallets(wallets)
			}));
		}
	};

	return {
		...walletStore,
		updateWalletBalance,
		fetch,
		rawSet: (raw: [UserWallet]) => {
			walletStore.set(transformToWallets(raw));
		}
	};
})();
