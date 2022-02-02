import { browser } from '$app/env';
import type { Exchange, OperationResult } from '@urql/core';
import {
	Client,
	CombinedError,
	createClient as createUrqlClient,
	dedupExchange,
	fetchExchange,
	ssrExchange,
	subscriptionExchange
} from '@urql/core';
import { devtoolsExchange } from '@urql/devtools';
import { cacheExchange } from '@urql/exchange-graphcache';
import type { OperationStore } from '@urql/svelte';
import { operationStore } from '@urql/svelte';
import type { DocumentNode } from 'graphql';
import { print } from 'graphql';
import type { ExecutionResult } from 'graphql-ws';
import Cookies from 'js-cookie';
import { isEqual } from 'lodash-es';
import { get, writable } from 'svelte/store';
import type { OperationContext } from 'urql';
import { v4 as uuid } from 'uuid';
import { pipe, subscribe } from 'wonka';
import { createSubscriptionClient } from './createWsClient';

type SubscriptionClient = ReturnType<typeof createSubscriptionClient>;

export const sessionId = uuid();

export let subscriptionClient: SubscriptionClient;

type SubscriptionHandler<Data> = (data: ExecutionResult<Data>) => void;

export function subscription<
	Data,
	Variables extends Record<string, unknown>
>(
	{ doc, variables }: { doc: any; variables: Variables },
	next: SubscriptionHandler<Data>
) {
	const sub = subscriptionClient.subscribe(
		{
			query: typeof doc === 'string' ? doc : print(doc),
			variables
		},
		{
			next,
			error: (error) => {
				// TODO: handle errors
			},
			complete: () => {}
		}
	);
	return sub;
}

const createClient = (args?: any) => {
	// create our subscription exchange

	const createSubscriptionsExchange = (): Exchange[] => {
		if (!browser) return [];

		return [
			subscriptionExchange({
				forwardSubscription(operation) {
					return {
						subscribe: (sink) => {
							const dispose = subscriptionClient.subscribe(
								{
									...operation,
									query:
										typeof operation.query === 'string'
											? operation.query
											: print(operation.query)
								},
								{
									error: (error) => {
										sink.error(error);
									},
									...sink
								}
							);

							return {
								unsubscribe: dispose
							};
						}
					};
				}
			})
		];
	};

	const subscription = createSubscriptionsExchange();

	const ssr = ssrExchange({
		isClient: browser,
		initialState: undefined
	});

	const urqlClient = createUrqlClient({
		...args,
		fetch: browser ? window.fetch : undefined,
		url: import.meta.env.VITE_GRAPHQL_URL as string,
		fetchOptions: () => {
			const token = Cookies.get('session');
			return {
				headers: {
					authorization: token ? token : '',
					sessionId: sessionId
				}
			};
		},
		exchanges: [
			devtoolsExchange,
			cacheExchange({
				keys: {
					LatestGame: (data) => null
				},
				updates: {
					Subscription: {}
				}
			}),
			dedupExchange,
			fetchExchange,
			ssr,
			...subscription
		]
	});

	// create the sub client on the browser
	if (browser) {
		subscriptionClient = createSubscriptionClient();
	}

	return urqlClient;
};

const client = browser ? createClient() : null;

export const getClient = (): Client => {
	if (!browser) {
		return null;
	}
	return client;
};

type Unsubscriber = { unsubscribe: () => void };

export function createQuery<T, K extends object>(query: DocumentNode) {
	let unsub: Unsubscriber;
	let loading = writable(false);
	let error = writable<CombinedError | null>(null);
	let data = (() => {
		let store = writable<T | null>(null);
		return store;
	})();

	const request = (variables: K, context: any): Unsubscriber => {
		const client = getClient();
		loading.set(true);
		return pipe(
			client.query<T, K>(query, variables, context || {}),

			subscribe((value) => {
				if (unsub && context?.pollInterval === undefined) {
					unsub.unsubscribe();
				}

				loading.set(false);
				data.set(value.data);
				error.set(value.error);
			})
		);
	};
	let requestCount = 0;
	return {
		query: (variables: K, context?: any) => {
			let initialData = (() => {
				if (browser) {
					const client = getClient();
					const cacheData = client.readQuery<T, K>(
						query,
						variables,
						context || {}
					)?.data;
					if (cacheData) data.set(cacheData);
					return cacheData;
				}
			})();

			const refetch = (refetchVariables: K, refetchContext?: any) => {
				if (browser) {
					loading.set(false);
					// loading.set(false);
					let skip =
						refetchContext?.skip ||
						(requestCount === 0 &&
							initialData &&
							isEqual(variables, refetchVariables) &&
							refetchContext?.pollInterval === undefined);

					if (!skip) {
						if (unsub) unsub.unsubscribe();
						unsub = request(
							refetchVariables,
							refetchContext || context || {}
						);
						variables = refetchVariables;
					}

					requestCount += 1;
				}
			};

			//   if (context?.refetchOnAuthentication && browser) {
			//     onMount(() => {
			//       const unsubscribe = subscribeToGlobalEventEmitter({
			//         authenticate: () => {
			//           refetch(
			//             {
			//               ...variables,
			//               randomVariableToTriggerRefetch: true,
			//             },
			//             context,
			//           );
			//         },
			//       });

			//       return () => unsubscribe();
			//     });
			//   }

			if (!initialData) refetch(variables, context);

			return {
				refetch,
				data,
				loading,
				error
			};
		}
	};
}

export function createRawQuery() {
	const client = getClient();
	return async function query<TData, TVariables extends object = {}>(
		documentNode: DocumentNode,
		variables: TVariables,
		context?: Partial<OperationContext>
	): Promise<OperationStore<TData, TVariables>> {
		try {
			const store = operationStore<TData, TVariables>(
				documentNode,
				variables,
				context
			);
			const result = await client
				.query(store.query, store.variables, store.context)
				.toPromise();

			Object.assign(get(store), {
				...result,
				context: {
					...store.context,
					requestPolicy: 'cache-only'
				}
			});

			return store;
		} catch (error) {
			return error;
		}
	};
}

export function createMutation<TData, TVariables extends Object>(
	document: DocumentNode
) {
	type Store = {
		loading: boolean;
		data: TData | null;
		error: undefined | null | string;
	};

	const store = writable<Store>({
		loading: false,
		data: null,
		error: null
	});

	const mutate = (
		variables: TVariables | undefined,
		context?: Partial<OperationContext>
	) => {
		new Promise<OperationResult<TData>>(async (resolve) => {
			try {
				const client = getClient();

				store.update((prev) => ({
					...prev,
					loading: true
				}));

				const response = await client
					.mutation<TData, TVariables>(document, variables, context)
					.toPromise();

				if (response?.error) {
					store.update((prev) => ({
						...prev,
						error: response.error.message,
						loadding: false
					}));
					throw new Error(response.error.message);
				} else {
					store.update((prev) => ({
						...prev,
						data: response.data || null,
						error: null,
						loading: false
					}));
				}

				resolve(response);
			} catch (e) {
				// do something important, idk
			}
		});
	};

	return {
		...store,
		mutate
	};
}

export default createClient;
