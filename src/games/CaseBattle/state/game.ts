import type { Battle, InventorySkin } from '$generated/graphql';
import { derived, get, writable } from 'svelte/store';
import { matchesState } from 'xstate';
import { machineState } from './general';

type PlayerWins = Record<string, Array<InventorySkin>>;

export const currentBattle = (() => {
	const store = writable<Battle>();

	return {
		...store
	};
})();

export const isRolling = derived(machineState, (state) =>
	matchesState('ROLLING', state)
);

export const currentRound = derived(currentBattle, (current) => {
	if (!current) return null;

	if (!current.currentRound) return current.rounds[0];

	return current.rounds.find(
		(r) => r.roundNumber === current.currentRound
	);
});

export const playerWins = (() => {
	const store = writable<PlayerWins>({});

	return {
		...store,
		addSkinToPlayer: (playerId: string, skin: InventorySkin) => {
			const playerWins = get(store);
			console.log(playerWins, playerId);
			if (!playerWins[playerId]) {
				playerWins[playerId] = [skin];
			} else {
				playerWins[playerId].push(skin);
			}

			store.set(playerWins);
		}
	};
})();
