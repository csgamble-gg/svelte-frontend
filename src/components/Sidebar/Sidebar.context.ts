import { get, writable } from 'svelte/store';
import { browser } from '$app/env';

const storedSidebarState = browser
	? localStorage.getItem('sidebarOpen')
	: 'true';

const isOpen = writable(JSON.parse(storedSidebarState));

isOpen.subscribe((value) => {
	if (browser) {
		localStorage.setItem('sidebarOpen', JSON.stringify(value));
	}
});

function toggleSidebar() {
	isOpen.set(!get(isOpen));
}

export { isOpen, toggleSidebar };
