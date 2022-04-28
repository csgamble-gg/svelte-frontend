import { browser } from '$app/env';
import { onDestroy } from 'svelte';
import { getEmitterStores } from '../emitters/global/index';
import { notificationsEmitter } from './notifications';
import { userEmitter } from './user';
import { userBalanceEmitter } from './wallets';

export const initEmitters = (): void => {
	const { emitter } = getEmitterStores();

	if (browser) {
		const subscriptions = [
			userEmitter(),
			userBalanceEmitter(),
			notificationsEmitter()
		];

		emitter.next({ type: 'init' });

		onDestroy(() => {
			subscriptions.forEach((unsubscribe) => {
				unsubscribe();
			});
		});
	}
};
