import type { User } from '$generated/graphql';
import { getContext, setContext } from 'svelte';
import { createEmitter, Emitter } from '../create';

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

type Emitters = {
	emitter: Emitter;
	subscribeToGlobalEventEmitter: (
		eventMap: Partial<EventMap>
	) => GlobalEmitter;
};

type GlobalEmitter = unknown;

export const subscribeToGlobalEventEmitter = (
	eventMap: Partial<EventMap>
): GlobalEmitter =>
	globalEventEmitter.subscribe((event) => {
		const selectedEvent =
			event.type in eventMap ? eventMap[event.type] : undefined;

		if (selectedEvent) {
			selectedEvent(event);
		}
	});

export const createEmitterStores = (): Emitters => {
	const stores = {
		emitter: globalEventEmitter,
		subscribeToGlobalEventEmitter
	};

	setContext('globalEventEmitter', stores);

	return stores;
};

type Stores = ReturnType<typeof createEmitterStores>;

export const getEmitterStores = (): Emitters => {
	const stores = getContext('globalEventEmitter') as Stores;

	return stores;
};
