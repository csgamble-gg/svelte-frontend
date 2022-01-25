import type { EventObject, StateNode, StateSchema } from 'xstate';

type BaseBet = {
	amount: number;
};

type BaseContext = {
	bet: BaseBet | null;
};

export interface Schema extends StateSchema {
	states: {
		idle: {};
		fetching: {};
	};
}

export type BaseBetEvents = { type: 'BET' };

export type BettingEvents<T extends BaseBetEvents> =
	| BaseBet
	| { type: 'SUCCESS'; bet: T }
	| { type: 'ERROR' };

function extendBet<
	T extends BaseBet,
	Context extends BaseContext,
	FullSchema extends Schema,
	AllEvents extends EventObject
>() {
	const betting: StateNode = {
		initial: 'idle',
		id: 'betting',
		states: {
			id: 'betting.idle',
			idle: {
				on: {
					BET: {
						target: 'fetching'
					}
				}
			}
		}
	};
}

export default extendBet;
