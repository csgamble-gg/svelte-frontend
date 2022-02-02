import { createEmitter } from '../create';

export const errorEventEmitter = createEmitter<any>();

export const subscribeToErrorEventEmitter = () => {
	errorEventEmitter.subscribe((event) => {
		console.log('EVENT', event);
		// selectedEvent(event)
	});
};
