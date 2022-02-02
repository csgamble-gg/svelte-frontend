import { isEqual, omit } from 'lodash-es';
import { nanoid } from 'nanoid/non-secure';
import { writable } from 'svelte/store';

export const toastList = (() => {
	const store = writable([]);

	return {
		...store,
		add: (toast) => {
			const id = nanoid();
			store.update((current) => {
				const isSameMessage = current.some((n) =>
					isEqual(omit(n, 'id'), toast)
				);

				if (isSameMessage) return current;

				return [
					{
						...toast,
						id
					},
					...current
				];
			});
		},
		remove: (id: string) => {
			store.update((current) => {
				return current.filter((n) => n.id !== id);
			});
		}
	};
})();
