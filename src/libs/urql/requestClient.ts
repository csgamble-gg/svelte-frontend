import { browser } from '$app/env';
import { errorEventEmitter } from '$emitters/error/index';
// import type { LoadOptions } from '$types/Load';
// import { url } from './config';
import { getSession } from '$utils/session';
import type { OperationResult } from '@urql/core';
import type { DocumentNode } from 'graphql';
import { print } from 'graphql';
// import { getModifiedLocale } from './index';

let cacheMap = new Map();

type Cache = {
	name: string;
};

export function requestClient<TData, TVariables>({
	doc,
	variables,
	load,
	cache
}: {
	doc: DocumentNode;
	variables: TVariables;
	load?: Omit<any, 'context' | 'stuff'>;
	cache?: Cache;
}): Promise<OperationResult<TData>> {
	if (!browser && !load) {
		throw new Error(
			`src/urql/requestClient - provide load param to requestClient, ${doc}`
		);
	}
	return new Promise((resolve, reject) => {
		try {
			const session = browser ? getSession() : load.session.sessionId;

			let selectedFetch = (load ? load.fetch : fetch) as typeof fetch;

			const makeFetch = () => {
				const cacheName =
					browser && cache ? cache.name + JSON.stringify(variables) : null;

				if (cacheName && cacheMap.has(cacheName)) {
					resolve(cacheMap.get(cacheName));
				} else {
					selectedFetch(import.meta.env.VITE_GRAPHQL_URL as string, {
						method: 'POST',
						headers: {
							...load?.session.headers,
							'Content-Type': 'application/json',
							authorization: session
						},
						body: JSON.stringify({
							query: print(doc),
							variables
						})
					})
						.then<Response>(async (res) => {
							if (res.status === 200) {
								let data = await res.json();
								if (data?.errors && data.errors.length !== 0) {
									let error = data.errors[0];

									errorEventEmitter.next({
										type: error?.errorType || 'errorExchange',
										error
									});
								}

								if (browser && cacheName) {
									cacheMap.set(cacheName, data);
								}

								resolve(data);
							} else {
								reject();
							}
						})
						.catch((error) => {
							console.log('svelte_requestClient_graphql_error', error);
							if (error) {
								errorEventEmitter.next({
									type: error?.errorType || 'errorExchange',
									error
								});
							}
							reject(error);
						});
				}
			};

			return makeFetch();
		} catch (e) {
			console.log('svelte_requestClient_graphql_reject_error', e);
			reject(e);
		}
	});
}
