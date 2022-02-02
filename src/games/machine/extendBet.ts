import { merge } from 'lodash-es';
import type { EventObject, StateNodeConfig, StateSchema } from 'xstate';
import { send } from 'xstate';

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

export type BaseBetEvents =
	| { type: 'BET' }
	| { type: 'ERROR'; errorMessage: string };

export type BettingEvents<T extends BaseBet> =
	| BaseBet
	| { type: 'SUCCESS'; bet: T };

function extendBet<
	T extends BaseBet,
	Context extends BaseContext,
	FullSchema extends Schema,
	AllEvents extends EventObject
>(betting: any) {
	type Events = EventObject & BettingEvents<T>;
	type StateNode = StateNodeConfig<Context, Schema, Events>;
	const baseBetting: StateNode = {
		initial: 'idle',
		id: 'betting',
		states: {
			idle: {
				id: 'betting.idle',
				on: {
					BET: {
						target: 'fetching'
					}
				}
			},
			fetching: {
				invoke: {
					id: 'mutationBet',
					src: 'mutationBet',
					onDone: {
						actions: send('SUCCESS')
					},
					onError: {
						actions: send('ERROR')
					}
				},
				on: {
					SUCCESS: { target: 'play' },
					ERROR: {
						target: 'idle'
					}
				}
			}
		}
	};

	return merge(baseBetting, betting) as StateNodeConfig<
		Context,
		FullSchema,
		AllEvents
	>;
}

export default extendBet;
