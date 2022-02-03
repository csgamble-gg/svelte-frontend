import { browser } from '$app/env';
import type { UserWallet, UserWalletsQuery } from '$generated/graphql';
import {
	CurrencyEnum as TCurrencyEnum,
	UserWalletsDocument
} from '$generated/graphql';
import { CurrencyEnum } from '$types/index';
import { getClient } from '@urql/svelte';
import { mapValues } from 'lodash-es';
import { writable } from 'svelte/store';

type Balance = {
	balance: number;
};

export type Currency = TCurrencyEnum;

export type Balances = Record<Currency, Balance>;

export type State = {
	balances: Balances;
};

export const rawWallets = (() => {
	const defaultBalances = mapValues(CurrencyEnum, () => ({
		balance: 0
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
