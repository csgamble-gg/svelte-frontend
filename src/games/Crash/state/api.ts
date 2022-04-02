import type {
	CashoutCrashBetMutationResult,
	CreateCrashBetMutation,
	CreateCrashBetMutationVariables,
	MutationCashoutCrashBetArgs
} from '$generated/graphql';
import {
	CashoutCrashBetDocument,
	CreateCrashBetDocument,
	CurrencyEnum
} from '$generated/graphql';
import { get } from 'svelte/store';
import { requestClient } from '../config';
import * as general from '../state/general';
import { state } from './game';

export const mutationBet = () =>
	new Promise(async (resolve, reject) => {
		const amount = Number(get(general.amount));
		const currency = CurrencyEnum[get(general.currency)];
		try {
			const { data } = await requestClient<
				CreateCrashBetMutation,
				CreateCrashBetMutationVariables
			>(CreateCrashBetDocument, {
				input: {
					betAmount: amount,
					currency: CurrencyEnum[currency],
					gameId: get(state).gameId
				}
			});

			if (data?.createCrashBet) {
				resolve(data);
			} else {
				reject();
			}
		} catch (e) {
			reject(e);
		}
	});

export const mutationCashout = () =>
	new Promise(async (resolve, reject) => {
		try {
			const {} = await requestClient<
				CashoutCrashBetMutationResult,
				MutationCashoutCrashBetArgs
			>(CashoutCrashBetDocument, {
				input: {
					gameId: get(state).gameId
				}
			});

			// if (bet) {
			// 	resolve(bet);
			// } else {
			// 	reject();
			// }
			resolve({});
		} catch (error) {
			reject(error);
		}
	});
