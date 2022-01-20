import {
	createClient,
	dedupExchange,
	fetchExchange,
	gql,
	subscriptionExchange
} from '@urql/svelte';
import { cacheExchange } from '@urql/exchange-graphcache';
import Cookies from 'js-cookie';
import { createClient as createWSClient } from 'graphql-ws';
import ws from 'websocket';
import { v4 as uuid } from 'uuid';
import type {
	RouletteGameUpdatedSubscription,
	UserEventSubscription
} from '$generated/graphql';
import { devtoolsExchange } from '@urql/devtools';
import { GetRecentGamesDocument } from '$generated/graphql';
import { createSubscriptionClient } from './createWsClient';

let { w3cwebsocket } = ws;

export const sessionId = uuid();

// const subscriptionClient = createWSClient({
// 	url: import.meta.env.VITE_SUBSCRIPTIONS_URL as string,
// 	webSocketImpl: w3cwebsocket,
// 	keepAlive: 10_000,
// 	connectionParams: () => ({
// 		sessionId: sessionId
// 	})
// })

const subscriptionClient = createSubscriptionClient();
const createUrqlClient = async (args?: any) =>
	await createClient({
		...args,
		url: import.meta.env.VITE_GRAPHQL_URL,
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
					Subscription: {
						userEvent: (
							result: UserEventSubscription,
							args,
							cache,
							info
						) => {
							const fragment = gql`
								fragment balance on User {
									_id
									balance
								}
							`;
							cache.writeFragment(fragment, result.userEvent.user);
						},
						rouletteGameUpdated: (
							result: RouletteGameUpdatedSubscription,
							_,
							cache
						) => {
							if (result.rouletteGameUpdated.status !== 'finished') return;
							cache.updateQuery(
								{
									query: GetRecentGamesDocument,
									variables: { input: { gameType: 'roulette', limit: 6 } }
								},
								(data) => {
									if (data === null) return;
									data.getRecentGames = [
										result.rouletteGameUpdated,
										// @ts-ignore
										...data.getRecentGames.slice(0, 5)
									];
									return data;
								}
							);
						},
						rouletteGameCreated: (result, _, cache) => {}
					}
				}
			}),
			dedupExchange,
			fetchExchange,
			subscriptionExchange({
				forwardSubscription: (operation) => ({
					subscribe: (sink) => ({
						unsubscribe: subscriptionClient.subscribe(operation, sink)
					})
				})
			})
		]
	});

export default createUrqlClient;
