import { sessionId } from '$libs/urql/urqlClient';
import type { HouseGameEnum, LoadInput } from '$types/index';
import type { OperationResult } from '@urql/core';
import type { DocumentNode } from 'graphql';
import { print } from 'graphql';
import { getContext, onMount, setContext } from 'svelte';
import type { Writable } from 'svelte/store';
import { get, writable } from 'svelte/store';
import { errorEventEmitter } from '../../emitters/error';
import type { create as generalCreate } from './general';

type SetupProps = {
	generalContext: GeneralContext;
};

// TODO: add baseevents type to here
type Send = (event: unknown) => void;

export type GeneralContext = ReturnType<typeof generalCreate> & {
	send: Send;
};

export const setGeneralContext = (context: GeneralContext): void => {
	setContext('GAME', context);
};
export const getGeneralContext = (): GeneralContext => getContext('GAME');

export const setup = ({ generalContext }: SetupProps): void => {
	setGeneralContext(generalContext);

	onMount(() => {
		return () => {
			generalContext.amount.reset();
		};
	});
};

type Config = {
	name: HouseGameEnum;
	getSession: () => string;
};

type ConfigStore = Writable<Config>;

export const getConfigContext = (): ConfigStore =>
	getContext<ConfigStore>('config');
export const setConfigContext = (config: ConfigStore): void =>
	setContext('config', config);

export const createGameConfig = (
	baseConfig: Config
): { config: Writable<Config>; requestClient: unknown } => {
	const config = writable<Config>(baseConfig);

	function requestClient<TData, TVariables>(
		doc: DocumentNode,
		variables: TVariables,
		load?: LoadInput
	): Promise<OperationResult<TData>> {
		return new Promise((resolve, reject) => {
			const { getSession } = get(config);
			const session = getSession();

			const fetchType: typeof fetch = load ? load.fetch : fetch;

			fetchType(import.meta.env.VITE_GRAPHQL_URL as string, {
				method: 'POST',
				headers: {
					authorization: session,
					sessionId: sessionId,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					query: print(doc),
					variables
				})
			})
				.then(async (res) => {
					const data = await res.json();
					if (data?.errors) {
						data?.errors.forEach((error: unknown) => {
							throw error;
						});
					}

					resolve(data);
				})
				.catch((error) => {
					if (error) {
						errorEventEmitter.next({
							error
						});
					}
					reject(error);
				});
		});
	}

	return { config, requestClient };
};
