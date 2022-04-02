import type { Battle } from '$generated/graphql';
import { writable } from 'svelte/store';

export const activeBattles = (() => {
	const store = writable<Battle[]>();

	return {
		...store,
		addBattle: (battle: Battle) => {
			store.update((current) => [battle, ...current]);
		}
	};
})();
