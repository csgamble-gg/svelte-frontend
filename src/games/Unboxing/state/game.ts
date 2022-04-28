import type { Case, InventorySkin } from '$generated/graphql';
import { derived, writable } from 'svelte/store';
import { matchesState } from 'xstate';
import { machineState } from './general';

export const isRolling = derived(machineState, (state) =>
	matchesState('rolling', state)
);

export const isDoneRolling = derived(machineState, (state) =>
	matchesState('done', state)
);

export const isLoading = derived(
	machineState,
	(state) =>
		matchesState('fetching', state) ||
		matchesState('waitOnSubscription', state)
);

export const reelsVisible = derived(
	machineState,
	(state) => !matchesState('idle', state)
);

export const currentCaseId = writable(null);

export const winningIndex = writable<number>(null);

export const winningItem =
	writable<Omit<InventorySkin, '__typename' | 'currency' | 'type'>[]>(
		null
	);

export const currentCase = (() => {
	const rawStore = writable<Case>(null);

	return {
		...rawStore
	};
})();
