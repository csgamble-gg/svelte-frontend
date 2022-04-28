import { browser } from '$app/env';
import { getStores as getUserStores } from '$stores/user';
import type { EventMap } from '../emitters/global/index';
import { getEmitterStores } from '../emitters/global/index';

export const userEmitter = (): void => {
	const stores = getUserStores();
	const { userStore } = stores;
	const { emitter } = getEmitterStores();

	const eventMap: Partial<EventMap> = {
		initUserResponse: ({ user }) => {
			userStore.setUser(user);
		}
	};

	return emitter.subscribe((event) => {
		const handleEmitEvent = () => {
			const selectedEvent = eventMap[event.type];

			if (selectedEvent) {
				selectedEvent(event);
			}
		};

		if (browser) {
			handleEmitEvent();
		} else {
			handleEmitEvent();
		}
	});
};
