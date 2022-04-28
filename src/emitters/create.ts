type Unsubscribe = () => void;

export type Emitter = {
	getSubscriptions: () => Set<unknown>;
	subscribe: (handler: unknown) => Unsubscribe;
	next: (event: unknown) => void;
};

export function createEmitter<TEvents>(): Emitter {
	type Handler = (event: TEvents) => void;

	const subscriptions = new Set<Handler>();

	type Unsubscribe = () => void;

	return {
		getSubscriptions: () => subscriptions,
		next: (event: TEvents) => {
			subscriptions.forEach((handler) => {
				handler(event);
			});
		},
		subscribe: (handler: Handler): Unsubscribe => {
			subscriptions.add(handler);

			return function unsubscribe() {
				subscriptions.delete(handler);
			};
		}
	};
}
