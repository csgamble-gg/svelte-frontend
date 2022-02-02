import type {
	CurrentUserQuery,
	CurrentUserQueryVariables,
	User
} from '$generated/graphql';
import { CurrentUserDocument } from '$generated/graphql';
import { requestClient } from '$libs/urql/requestClient';
import type { LoadInput } from '$types/index';
import { globalEventEmitter } from '../emitters/global';

export async function load(load: LoadInput) {
	if (load.session.sessionId) {
		const [initUserResponse] = await Promise.all([
			requestClient<CurrentUserQuery, CurrentUserQueryVariables>({
				doc: CurrentUserDocument,
				variables: {},
				load: load
			})
		]);

		if (initUserResponse.data.getCurrentUser) {
			return initUserResponse.data.getCurrentUser;
		}
		return null;
	}

	return null;
}

export const initialize = (user: User) => {
	globalEventEmitter.next({ type: 'initUserResponse', user });
};
