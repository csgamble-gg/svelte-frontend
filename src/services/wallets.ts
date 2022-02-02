import { browser } from '$app/env';
import type { AvailableBalancesSubscription } from '$generated/graphql';
import { AvailableBalancesDocument } from '$generated/graphql';
import { subscriptionClient } from '$libs/urql/urqlClient';
import { rawWallets } from '$stores/wallets';
import type { ExecutionResult } from 'graphql';
import { print } from 'graphql';
import { getEmitterStores } from '../emitters/global';

export const userBalanceEmitter = () => {
	const { subscribeToGlobalEventEmitter } = getEmitterStores();

	type Unsubscribe = () => void;
	let subscriptions: Unsubscribe[] = [];

	const globalUnsubscribe = subscribeToGlobalEventEmitter({
		initUserResponse: ({ user }) => {
			// rawWallets.set(keyBy(user.wallets, 'type'));

			if (browser) {
				rawWallets.fetch();
			}

			subscriptionClient.subscribe(
				{
					query: print(AvailableBalancesDocument)
				},
				{
					next: (
						value: ExecutionResult<AvailableBalancesSubscription>
					) => {
						const availableBalances = value.data.availableBalances;

						if (availableBalances) {
							rawWallets.updateWalletBalance(availableBalances.balance);
						}
					},
					complete: () => {},
					error: () => {}
				}
			);
		}
	});
	return () => {
		globalUnsubscribe();
	};
};
