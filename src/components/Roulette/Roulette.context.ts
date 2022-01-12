import { get, writable } from 'svelte/store';
import type { Bet, RouletteGame } from '../../generated/graphql';
import Big from 'big.js';

interface CurrentBets {
	[key: string]: any[];
}

const defaultCurrentBets: CurrentBets = {
	purple: [],
	blue: [],
	orange: []
};

interface RouletteContext {
	game: RouletteGame;
	currentBets: CurrentBets;
}

const defaultContext: RouletteContext = {
	game: null,
	currentBets: defaultCurrentBets
};

const rouletteContext = writable<RouletteContext>(defaultContext);
const betAmount = writable<number>(0);

function updateRouletteGame(gameData: RouletteGame) {
	rouletteContext.update(() => ({
		currentBets: get(rouletteContext).currentBets,
		game: gameData
	}));
}

function updateRouletteBets(newBets: CurrentBets) {
	rouletteContext.update(() => ({
		currentBets: newBets,
		game: get(rouletteContext).game
	}));
}

function resetBets() {
	rouletteContext.update((currentContext) => ({
		...currentContext,
		currentBets: defaultCurrentBets
	}));
}

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

const groupRouletteBets = (bets: Bet[]) => {
	const groupedBetsByColor = {
		...defaultCurrentBets,
		...bets.reduce((acc, curr) => {
			const color = getRouletteColorFromSelections(curr.selections);
			if (!acc[color]) {
				acc[color] = [];
			}
			acc[color].push(curr);
			return acc;
		}, {})
	};

	['blue', 'purple', 'orange'].forEach((val) => {
		rouletteContext.update((currentContext) => ({
			game: currentContext.game,
			currentBets: {
				...currentContext.currentBets,
				[val]: Object.values(
					groupedBetsByColor[val].reduce((acc: { [key: string]: any }, curr: any) => {
						if (!acc) return curr;
						if (acc[curr.user._id]) {
							acc[curr.user._id] = {
								...curr,
								amount: new Big(acc[curr.user._id].amount).plus(curr.amount).toNumber()
							};
						} else {
							acc[curr.user._id] = {
								...curr
							};
						}

						return acc;
					}, {})
				)
			}
		}));
	});
};

export {
	groupRouletteBets,
	rouletteContext,
	updateRouletteGame,
	updateRouletteBets,
	betAmount,
	defaultCurrentBets,
	getRouletteColorFromSelections,
	sumBets,
	resetBets
};
