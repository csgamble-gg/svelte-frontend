import { createEmitter } from '../create';

type Events = {
	type: 'error';
};

export const errorEventEmitter = createEmitter<Events>();
