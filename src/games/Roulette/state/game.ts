import type { Bet, RouletteBets, RouletteGame } from '$generated/graphql';
import { writable } from 'svelte/store';

export const gameHistory = (() => {
	const store = writable<RouletteGame[]>([]);

	return {
		...store,
		addGame: (game: RouletteGame) => {
			store.update((current) => [game, ...current].slice(0, 6));
		}
	};
})();

export const state = writable<RouletteGame | null>(null);

export const defaultCurrentBets: RouletteBets = {
	purple: [],
	blue: [],
	orange: []
};

export const currentBets = writable<RouletteBets>(defaultCurrentBets);

export const filterBets = (bets: Bet[]) => {};

const betAmount = writable<number>(0);

const getRouletteColorFromSelections = (selections: Array<Number>) => {
	if (selections[0] === 28) {
		return 'orange';
	}

	if (selections[0] === 0) {
		return 'purple';
	}

	return 'blue';
};

const sumBets = (currentBets: Array<Bet>) => {
	return currentBets.reduce((acc, curr) => {
		return acc + curr.amount;
	}, 0);
};

export { betAmount, getRouletteColorFromSelections, sumBets };
