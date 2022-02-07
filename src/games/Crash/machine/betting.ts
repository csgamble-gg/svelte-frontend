import extendBet from '$games/machine/extendBet';
import type { StateNodeConfig } from 'xstate';
import type { CrashContext } from '.';

export type BetEvent = {
	type: 'BET';
};

export type BettingSchema =
	| { value: 'idle'; context: {} }
	| { value: 'fetching'; context: {} };

export type BettingEvents = BetEvent | { type: 'SUCCESS' };

const betting: StateNodeConfig<
	CrashContext,
	BettingSchema,
	BettingEvents
> = {
	states: {
		idle: {},
		fetching: {
			on: {
				SUCCESS: { target: 'idle' }
			}
		}
	}
};

export default extendBet(betting);
