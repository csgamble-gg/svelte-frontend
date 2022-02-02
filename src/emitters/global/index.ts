import type { User } from '$generated/graphql';
import { getContext, setContext } from 'svelte';
import { createEmitter } from '../create';

type Events = { type: 'init' } | { type: 'initUserResponse'; user: User };

type EventSelector<
	T extends Events['type'],
	U extends { type: Events['type'] }
> = U extends {
	type: T;
}
	? U
	: never;

export type EventMap = {
	[t in Events['type']]: (value: EventSelector<t, Events>) => void;
};

export const globalEventEmitter = createEmitter<Events>();

export const subscribeToGlobalEventEmitter = (
	eventMap: Partial<EventMap>
) =>
	globalEventEmitter.subscribe((event) => {
		const selectedEvent =
			event.type in eventMap ? eventMap[event.type] : undefined;

		if (selectedEvent) {
			selectedEvent(event);
		}
	});

export const createEmitterStores = () => {
	const stores = {
		emitter: globalEventEmitter,
		subscribeToGlobalEventEmitter
	};

	setContext('globalEventEmitter', stores);

	return stores;
};

type Stores = ReturnType<typeof createEmitterStores>;

export const getEmitterStores = () => {
	const stores = getContext('globalEventEmitter') as Stores;

	return stores;
};
