import { browser } from '$app/env';
import type { LoadInput } from '$types/index';
import type { createClient, Exchange, OperationContext } from '@urql/core';
import {
	Client,
	createClient as createUrqlClient,
	dedupExchange,
	fetchExchange,
	subscriptionExchange
} from '@urql/core';
import { devtoolsExchange } from '@urql/devtools';
import type { OperationStore } from '@urql/svelte';
import { operationStore } from '@urql/svelte';
import type { DocumentNode } from 'graphql';
import { print } from 'graphql';
import { get } from 'svelte/store';
import { subscriptionClient } from './urqlClient';

export const createSSRClient = (loadOptions: LoadInput) => {
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

	const urqlClient = createUrqlClient({
		fetch: loadOptions.fetch,
		requestPolicy: 'network-only',
		url: import.meta.env.VITE_GRAPHQL_URL as string,
		fetchOptions: () => {
			return {
				headers: {
					authorization: loadOptions.session.sessionId
				}
			};
		},
		exchanges: [
			devtoolsExchange,
			dedupExchange,
			...subscription,
			fetchExchange
		]
	});

	return urqlClient;
};

export type UrqlSSRClient = ReturnType<typeof createClient>;

export function createSSRQuery({ client }: { client: Client }) {
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

export type SSRQuery = ReturnType<typeof createSSRQuery>;
