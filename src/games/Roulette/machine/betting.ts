import extendBet from '$games/machine/extendBet';
import type { StateNodeConfig } from 'xstate';
import type { RouletteContext } from '.';

export type BetEvent = {
	type: 'BET';
	selections: number[];
};

export type BettingSchema =
	| { value: 'idle'; context: {} }
	| { value: 'fetching'; context: {} };

export type BettingEvents = BetEvent | { type: 'SUCCESS' };

const betting: StateNodeConfig<
	RouletteContext,
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
