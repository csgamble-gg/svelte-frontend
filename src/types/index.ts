// Declaration types for Loading
// * declarations that are not exported are for internal use

import type { User } from '$generated/graphql';
import type { createSSRQuery } from '$libs/urql/createSSRClient';
import type {
	RequestEvent,
	ResolveOptions
} from '@sveltejs/kit/types/internal';
// import type { Either, InferValue } from '@sveltejs/kit/types/helper';
import type { Client } from '@urql/core';

export type MaybePromise<T> = T | Promise<T>;

export type ExtendedRequestEvent = RequestEvent & {
	locals: {
		sessionId?: string;
		sidebarVisibility?: string;
	};
};

export type HandleInput = {
	event: ExtendedRequestEvent;
	resolve(
		event: ExtendedRequestEvent,
		opts?: ResolveOptions
	): MaybePromise<Response>;
};

export interface LoadInput<
	PageParams extends Record<string, string> = Record<string, string>,
	Stuff extends Record<string, unknown> = Record<string, unknown>,
	Session = any
> {
	url: URL;
	params: PageParams;
	fetch(info: RequestInfo, init?: RequestInit): Promise<Response>;
	session: Session;
	stuff: Stuff & ExtendedStuff;
}

export interface LoadOutput<
	Props extends Record<string, any> = Record<string, any>,
	Stuff extends Record<string, any> = Record<string, any>
> {
	status?: number;
	error?: string | Error;
	redirect?: string;
	props?: Props;
	stuff?: Stuff;
	maxage?: number;
}

type ExtendedStuff = {
	query: ReturnType<typeof createSSRQuery>;
	urqlClient: Client;
};

interface LoadInputExtends {
	stuff?: Record<string, any>;
	pageParams?: Record<string, string>;
	session?: any;
}
interface LoadOutputExtends {
	stuff?: Record<string, any>;
	props?: Record<string, any>;
}

interface Fallthrough {
	fallthrough: true;
}
export interface Load<
	Input extends LoadInputExtends = Required<LoadInputExtends>,
	Output extends LoadOutputExtends = Required<LoadOutputExtends>
> {
	(
		input: LoadInput<
			InferValue<Input, 'pageParams', Record<string, string>>,
			InferValue<Input, 'stuff', Record<string, unknown>>,
			InferValue<Input, 'session', unknown>
		>
	): MaybePromise<
		Either<
			Fallthrough,
			LoadOutput<
				InferValue<Output, 'props', Record<string, unknown>>,
				InferValue<Output, 'stuff', Record<string, unknown>>
			>
		>
	>;
}

export interface LoadProps {
	urqlClient: Client;
	user?: User;
}

export enum RouletteStatusEnum {
	created = 'created',
	started = 'started',
	finished = 'finished'
}

export enum HouseGameEnum {
	roulette = 'roulette',
	crash = 'crash',
	unboxing = 'unboxing',
	battle = 'battle'
}

export enum CaseFilters {
	new = 'NEW',
	featured = 'FEATURED',
	percent10 = '10%'
}

export enum SkinQualityEnum {
	'Battle-Scarred' = 'BS',
	'Well-Worn' = 'WW',
	'Factory New' = 'FN',
	'Field-Tested' = 'FT',
	'Minimal Wear' = 'MW'
}

export enum CurrencyEnum {
	USD = 'USD',
	BTC = 'BTC',
	ETH = 'ETH',
	DOGE = 'DOGE',
	EOS = 'EOS'
}
