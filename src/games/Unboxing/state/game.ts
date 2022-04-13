import type { Case, Skin } from '$generated/graphql';
import { derived, writable } from 'svelte/store';
import { matchesState } from 'xstate';
import { machineState } from './general';

const getPercent = (num: number, max: number) => {
	return (num / 100) * max;
};

export const isRolling = derived(machineState, (state) =>
	matchesState('rolling', state)
);

export const isDoneRolling = derived(machineState, (state) =>
	matchesState('done', state)
);

export const reelsVisible = derived(
	machineState,
	(state) => !matchesState('idle', state)
);

export const currentCaseId = writable(null);

export const winningIndex = writable(null);

export const winningItem = writable<Skin>(null);

export const currentCase = (() => {
	const rawStore = writable<Case>(null);

	return {
		...rawStore
	};
})();
