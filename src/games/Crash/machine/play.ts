import type { CrashBet } from '$generated/graphql';
import type { StateNodeConfig } from 'xstate';
import { send } from 'xstate';
import type { CrashContext } from './index';

export interface Schema {
	states: {
		idle: {};
		fetching: {};
	};
}

export type Events =
	| { type: 'CASHOUT' }
	| { type: 'CASHOUT_SUCCESS'; bet: CrashBet }
	| { type: 'CASHOUT_ERROR' };

const play: StateNodeConfig<CrashContext, Schema, Events> = {
	initial: 'idle',
	id: 'betting.play',
	// onExit: ['finishGame'],
	states: {
		idle: {
			on: {
				CASHOUT: {
					target: 'fetching'
				}
			}
		},
		fetching: {
			invoke: {
				id: 'mutationCashout',
				src: 'mutationCashout',
				onDone: {
					actions: send('CASHOUT_SUCCESS')
				},
				onError: {
					actions: send('CASHOUT_ERROR')
				}
			},
			on: {
				CASHOUT_SUCCESS: {
					target: '#betting.idle'
				},
				CASHOUT_ERROR: {
					target: 'idle'
				}
			}
		}
	}
};

export default play;
