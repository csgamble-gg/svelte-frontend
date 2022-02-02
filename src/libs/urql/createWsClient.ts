import type { Client, ClientOptions } from 'graphql-ws';
import { createClient } from 'graphql-ws';
import Cookies from 'js-cookie';
import ws from 'websocket';
import { sessionId } from './urqlClient';

const { w3cwebsocket } = ws;

let activeSocket,
	pingSentAt = 0,
	timedOut,
	latency = 0;

const pingPong = {
	ping: (received) => {
		if (!received) {
			pingSentAt = Date.now();
			timedOut = setTimeout(() => {
				if (activeSocket.readyState === WebSocket.OPEN)
					activeSocket.close(4408, 'Ping timeout');
			}, 5_000);
		}
	},
	pong: (received) => {
		if (received) {
			latency = Date.now() - pingSentAt;
			clearTimeout(timedOut);
		}
	}
};

export const createSubscriptionClient = (
	options?: ClientOptions
): Client => {
	const client = createClient({
		url: import.meta.env.VITE_SUBSCRIPTIONS_URL as string,
		retryAttempts: 50,
		connectionParams: () => ({
			sessionId: sessionId,
			token: Cookies.get('session')
		}),
		webSocketImpl: w3cwebsocket,
		keepAlive: 10_000,
		on: {
			opened: (socket) => {
				activeSocket = socket;
			}
		},
		...pingPong,
		...options
	});

	return {
		...client,
		dispose: () => {
			client.dispose();
		}
	};
};
