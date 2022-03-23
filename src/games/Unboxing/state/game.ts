import type { CaseSkins, Skin } from '$generated/graphql';
import { shuffle } from 'lodash-es';
import { derived, get, writable } from 'svelte/store';
import { matchesState } from 'xstate';
import { MAX_SLOT_LENGTH } from '../types';
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

export const winningItem = writable(null);

export const reelSlots = (() => {
	const rawStore = writable([]);
	const store = writable<CaseSkins[]>([]);
	let initShuffle = false;

	const demoShuffle = () => {
		if (initShuffle) {
			initShuffle = false;
			return;
		}
		const items = get(rawStore);
		let slots = [];

		for (let i = 0; i < items.length; i++) {
			const slotItem = items[i];
			const probabilityPercentage =
				Math.floor(getPercent(slotItem.odds, MAX_SLOT_LENGTH)) <= 0
					? 1
					: Math.floor(getPercent(slotItem.odds, MAX_SLOT_LENGTH));

			slots.push(...Array(probabilityPercentage).fill(slotItem));
		}

		store.update(() => shuffle(slots));
	};

	return {
		...store,
		setRaw: (rawSkins: CaseSkins[]) => {
			rawStore.set(rawSkins);
			demoShuffle();
			initShuffle = true;
		},
		alignIndex: (index: number, item: Skin) => {
			const shuffledItems = get(store);

			shuffledItems.splice(index, 1, item);

			store.update(() => shuffledItems);
		},
		quickShuffle: () => {
			store.update(() => shuffle(get(store)));
		},
		demoShuffle,
		injectItem: (index: number, item: Skin) => {
			store.update((state) => {
				return state.splice(index, 1, item);
			});
		}
	};
})();
