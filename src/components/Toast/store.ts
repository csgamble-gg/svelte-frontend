import { writable } from 'svelte/store';

const defaultOptions = {
	duration: 4000,
	initial: 1
};

const createToast = () => {
	const { subscribe, set, update } = writable([]);
	let count = 0;
	const options = {};

	const show = (message: string) => {
		update((prev) => [
			...prev,
			{ message, id: count++, ...defaultOptions }
		]);
	};

	const remove = (id: number) => {
		update((prev) => prev.filter((item) => item.id !== id));
	};

	return {
		show,
		subscribe,
		set,
		update,
		remove
	};
};

export const toast = createToast();
