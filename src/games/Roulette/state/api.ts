import type {
	CreateBetMutation,
	CreateBetMutationVariables
} from '$generated/graphql';
import { CreateBetDocument, CurrencyEnum } from '$generated/graphql';
import { get } from 'svelte/store';
import { requestClient } from '../config';
import type { BetEvent } from '../machine/betting';
import { state } from './game';
import * as general from './general';

export const rouletteBet = (
	variables: CreateBetMutationVariables['input']
) =>
	new Promise(async (resolve, reject) => {
		try {
			const { data } = await requestClient<
				CreateBetMutation,
				CreateBetMutationVariables
			>(CreateBetDocument, {
				input: variables
			});

			if (data?.createBet) {
				resolve(data);
			} else {
				reject();
			}
		} catch (e) {
			reject(e);
		}
	});

export const mutationBet = (event: BetEvent) =>
	new Promise(async (resolve, reject) => {
		const amount = Number(get(general.amount));
		const currency = CurrencyEnum[get(general.currency)];

		try {
			const variables: CreateBetMutationVariables['input'] = {
				betAmount: amount,
				currency: CurrencyEnum[currency],
				gameId: get(state).gameId,
				selections: event.selections
			};

			const bet = await rouletteBet(variables);

			if (bet) {
				resolve(bet);
			} else {
				reject();
			}
		} catch (error) {
			reject(error);
		}
	});
