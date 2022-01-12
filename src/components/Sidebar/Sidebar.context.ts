import { writable } from 'svelte/store';

const isOpen = writable(true);

function toggleSidebar() {
	isOpen.update((value) => !value);
}

export { isOpen, toggleSidebar };
