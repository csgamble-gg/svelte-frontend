import type { UnboxingSubscriptionSubscription } from '$generated/graphql';
import { UnboxingSubscriptionDocument } from '$generated/graphql';
import { subscriptionClient } from '$libs/urql/urqlClient';
import { print } from 'graphql';
import { service } from './machine';

let subscriptionStream: ReturnType<typeof subscribeToStream>;

let subscribeToStream = (client: typeof subscriptionClient) => {
	return client.subscribe<UnboxingSubscriptionSubscription>(
		{ query: print(UnboxingSubscriptionDocument) },
		{
			next: (value) => {
				const item = value.data.caseOpened;

				if (item) {
					service.send({ type: 'SUBSCRIPTION_NEXT', payload: item });
				}
			},
			error: () => {},
			complete: () => {}
		}
	);
};

export const initialize = (): { unsubscribe: () => void } => {
	subscriptionStream = subscribeToStream(subscriptionClient);

	return {
		unsubscribe: () => {
			if (subscriptionStream) {
				subscriptionStream();
				subscriptionStream = null;
			}
		}
	};
};
