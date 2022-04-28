import type { User } from '$generated/graphql';
import { getContext, setContext } from 'svelte';
import { Writable, writable } from 'svelte/store';

export type UserState = {
	displayName: string;
	_id: string;
	avatar: string;
	isAuthenticated: boolean;
	balance: number;
};

export const createUserStore = (): {
	setUser: (user: User) => void;
} & Writable<UserState> => {
	const defaultUserStore: UserState = {
		displayName: '',
		_id: '',
		avatar: '',
		balance: 0,
		isAuthenticated: false
	};

	const userStore = writable<UserState>({
		...defaultUserStore
	});

	return {
		...userStore,
		setUser: async (user: User) => {
			const state: UserState = {
				displayName: user.displayName,
				_id: user._id,
				avatar: user.avatar,
				balance: user.balance,
				isAuthenticated: true
			};

			userStore.set(state);
		}
	};
};

export const createStores = (): Record<
	string,
	ReturnType<typeof createUserStore>
> => {
	const userStore = createUserStore();

	const stores = {
		userStore
	};

	setContext('userStore', stores);

	return stores;
};

type Stores = ReturnType<typeof createStores>;

export const getStores = (): Stores => {
	const stores = getContext('userStore') as Stores;
	return stores;
};
