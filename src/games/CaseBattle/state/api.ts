import {
	JoinBattleDocument,
	JoinBattleMutation,
	JoinBattleMutationVariables,
	MutationJoinBattleArgs
} from '$generated/graphql';
import { get } from 'svelte/store';
import { requestClient } from '../config';
import * as general from './general';

// export const createBattle = (
// 	variables: MutationCreateBattleArgs
// ): Promise<CreateBattleMutation> =>
// 	new Promise(async (resolve, reject) => {
// 		try {
// 			const { data } = await requestClient<
// 				CreateBattleMutation,
// 				CreateBattleMutationVariables
// 			>(CreateBattleDocument, variables);

// 			if (data?.createBattle) {
// 				resolve(data);
// 			} else {
// 				reject();
// 			}
// 		} catch (e) {
// 			reject(e);
// 		}
// 	});

// export const mutationCreateBattle = (event: any) =>
// 	new Promise(async (resolve, reject) => {
// 		const inPlayCurrency = get(general.currency);

// 		try {
// 			const variables: MutationCreateBattleArgs = {
// 				input: {
// 					cases: [],
// 					currency: inPlayCurrency
// 				}
// 			};
// 		} catch (e) {
// 			reject(e);
// 		}
// 	});

export const joinBattle = (
	variables: MutationJoinBattleArgs
): Promise<JoinBattleMutation> =>
	new Promise(async (resolve, reject) => {
		try {
			const { data } = await requestClient<
				JoinBattleMutation,
				JoinBattleMutationVariables
			>(JoinBattleDocument, variables);
		} catch (e) {
			reject(e);
		}
	});

export const mutationJoinBattle = (event) =>
	new Promise(async (resolve, reject) => {
		const inPlayCurrency = get(general.currency);

		try {
			const variables: MutationJoinBattleArgs = {
				input: {
					battleId: event.payload.battleId,
					currency: inPlayCurrency
				}
			};

			const battle = await joinBattle(variables);

			if (battle) {
				resolve(battle);
			} else {
				reject();
			}
		} catch (e) {
			reject(e);
		}
	});
