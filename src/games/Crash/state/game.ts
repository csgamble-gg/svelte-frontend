import type { CrashBet, CrashGame } from '$generated/graphql';
import { writable } from 'svelte/store';

export const cashedIn = writable<CrashBet[]>([]);
export const cashedOut = writable<CrashBet[]>([]);

export const state = writable<CrashGame | null>(null);

export const gameHistory = (() => {
	const gameHistoryStore = writable([]);

	return {
		...gameHistoryStore,
		addGame: (game: any) => {
			console.log(game);
			gameHistoryStore.update((games) => [game, ...games].slice(0, 18));
		}
	};
})();
