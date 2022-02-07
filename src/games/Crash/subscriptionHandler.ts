import type {
	CrashInitialQuery,
	CrashSubscriptionSubscription
} from '$generated/graphql';
import {
	CrashInitialDocument,
	CrashSubscriptionDocument
} from '$generated/graphql';
import { createRawQuery, subscriptionClient } from '$libs/urql/urqlClient';
import { print } from 'graphql';
import { get } from 'svelte/store';
import { state } from './state/game';

let subscriptionStream: ReturnType<typeof subscribeToStream>;

let subscribeToStream = (client: typeof subscriptionClient) => {
	return client.subscribe(
		{ query: print(CrashSubscriptionDocument) },
		{
			next: (value) => {
				const game = value.data
					?.crashGame as CrashSubscriptionSubscription['crashGame'];

				const $state = get(state);

				state.update(() => game);
			},
			error: () => {},
			complete: () => {}
		}
	);
};

export const initialize = (): { unsubscribe: () => void } => {
	subscriptionStream = subscribeToStream(subscriptionClient);

	const query = createRawQuery();

	query<CrashInitialQuery>(CrashInitialDocument, {}).then(({ data }) => {
		const { crashGame } = data.crashInitial;

		state.set(crashGame);
	});

	return {
		unsubscribe: () => {
			if (subscriptionStream) {
				subscriptionStream();
				subscriptionStream = null;
			}
		}
	};
};
