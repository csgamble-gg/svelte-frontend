import extendBet from '$games/machine/extendBet';
import type { StateNodeConfig } from 'xstate';
import type { CrashContext } from '.';
import play from './play';

export type BetEvent = {
	type: 'BET';
};

export type BettingSchema =
	| { value: 'idle'; context: null }
	| { value: 'fetching'; context: null };

export type BettingEvents = BetEvent | { type: 'SUCCESS' };

const betting: StateNodeConfig<
	CrashContext,
	BettingSchema,
	BettingEvents
> = {
	id: 'betting',
	type: 'compound',
	states: {
		idle: {},
		fetching: {},
		pending: {
			on: {
				GAME_FINISHED: { target: 'fetching', actions: 'resetState' }
			}
		},
		play
	}
};

export default extendBet(betting);
