import type { User } from '$generated/graphql';
import { getContext, setContext } from 'svelte';
import { writable } from 'svelte/store';

export type UserState = {
	displayName: string;
	_id: string;
	avatar: string;
	isAuthenticated: boolean;
	balance: number;
};

export const createUserStore = () => {
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

export const createStores = () => {
	const userStore = createUserStore();

	const stores = {
		userStore
	};

	setContext('userStore', stores);

	return stores;
};

type Stores = ReturnType<typeof createStores>;

export const getStores = () => {
	const stores = getContext('userStore') as Stores;
	return stores;
};
