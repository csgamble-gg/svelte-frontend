import type { Battle } from '$generated/graphql';
import { writable } from 'svelte/store';

export const currentBattle = (() => {
	const store = writable<Battle>();

	return {
		...store
	};
})();
