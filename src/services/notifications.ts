import { browser } from '$app/env';
import { errorEventEmitter } from '$emitters/error/index';
import { getEmitterStores } from '$emitters/global/index';
import type { ErrorSubscription } from '$generated/graphql';
import { ErrorDocument } from '$generated/graphql';
import { subscriptionClient } from '$libs/urql/urqlClient';
import { notifications } from '$notifications/index';
import type { ExecutionResult } from 'graphql';
import { print } from 'graphql';

export const notificationsEmitter = () => {
	const { subscribeToGlobalEventEmitter } = getEmitterStores();

	// const subscribeToNotifications = () => {
	//     if(browser) {
	//         const client = getClient()

	//         return pipe(
	//             client.subscription<>
	//         )
	//     }
	// }

	const globalUnsubscribe = subscribeToGlobalEventEmitter({
		// sub to error event stream
		initUserResponse: () => {
			subscriptionClient.subscribe(
				{
					query: print(ErrorDocument)
				},
				{
					next: (value: ExecutionResult<ErrorSubscription>) => {
						if (value.data.userError.message) {
							errorEventEmitter.next(value.data.userError);
						}
					},
					error: null,
					complete: null
				}
			);
		}
	});

	let errorEmitter = errorEventEmitter.subscribe((error) => {
		if (browser) {
			notifications.error.open({ message: error.message });
		}
	});

	return () => {
		errorEmitter();
		globalUnsubscribe();
	};
};
