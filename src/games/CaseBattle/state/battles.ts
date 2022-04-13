import type { BattleCreatedSubscription } from '$generated/graphql';
import { writable } from 'svelte/store';

// _id | players | currentRound

export type ActiveBattle = BattleCreatedSubscription['battleCreated'];

export const activeBattles = (() => {
	const store = writable<ActiveBattle[]>();

	return {
		...store,
		addBattle: (battle: ActiveBattle) => {
			store.update((current) => [battle, ...current]);
		}
	};
})();
