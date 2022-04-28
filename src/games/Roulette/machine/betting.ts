import extendBet from '$games/machine/extendBet';
import type { StateNodeConfig, StateSchema } from 'xstate';
import type { RouletteContext } from '.';

export type BetEvent = {
	type: 'BET';
	selections: number[];
};

export interface BettingSchema extends StateSchema {
	states: {
		idle: Record<string, unknown>;
		fetching: Record<string, unknown>;
	};
}

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
