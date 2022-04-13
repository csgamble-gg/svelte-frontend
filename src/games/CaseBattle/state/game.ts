import type { Battle } from '$generated/graphql';
import { derived, writable } from 'svelte/store';
import { matchesState } from 'xstate';
import { machineState } from './general';

export const currentBattle = (() => {
	const store = writable<Battle>();

	return {
		...store
	};
})();

export const isRolling = derived(machineState, (state) =>
	matchesState('ROLLING', state)
);
