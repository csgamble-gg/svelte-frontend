import type {
	MutationOpenCaseArgs,
	OpenCaseMutation,
	OpenCaseMutationVariables
} from '$generated/graphql';
import { OpenCaseDocument } from '$generated/graphql';
import { get } from 'svelte/store';
import { requestClient } from '../config';
import type { OpenCaseEvent } from '../machine';
import { currentCaseId } from './game';
import * as general from './general';

export const openCase = (
	variables: MutationOpenCaseArgs
): Promise<OpenCaseMutation> =>
	new Promise(async (resolve, reject) => {
		try {
			const { data } = await requestClient<
				OpenCaseMutation,
				OpenCaseMutationVariables
			>(OpenCaseDocument, variables);

			if (data?.openCase) {
				resolve(data);
			} else {
				reject();
			}
		} catch (e) {
			reject(e);
		}
	});

// OpenCaseEvent
export const mutationOpenCase = (
	event: OpenCaseEvent
): Promise<OpenCaseMutation> =>
	new Promise(async (resolve, reject) => {
		const inPlayCurrency = get(general.currency);

		try {
			const variables: MutationOpenCaseArgs = {
				input: {
					caseId: get(currentCaseId),
					currency: inPlayCurrency,
					amount: event.amount
				}
			};

			const box = await openCase(variables);

			if (box) {
				resolve(box);
			} else {
				reject();
			}
		} catch (e) {
			reject(e);
		}
	});
