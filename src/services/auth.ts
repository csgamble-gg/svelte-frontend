import type { CurrentUserQuery, User } from '$generated/graphql';
import { CurrentUserDocument } from '$generated/graphql';
import type { LoadInput } from '$types/index';
import { globalEventEmitter } from '../emitters/global';

export async function load(load: LoadInput) {
	if (load.session.sessionId) {
		const { data } = await load.stuff.query<CurrentUserQuery>(
			CurrentUserDocument,
			{}
		);

		if (data.getCurrentUser) {
			return data.getCurrentUser;
		}
		return null;
	}

	return null;
}

export const initialize = (user: User) => {
	globalEventEmitter.next({ type: 'initUserResponse', user });
};
