export function createEmitter<TEvents>() {
	type Handler = (event: TEvents) => void;

	let subscriptions = new Set<Handler>();

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
