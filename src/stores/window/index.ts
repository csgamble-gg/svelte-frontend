import { browser } from '$app/env';
import { derived, readable } from 'svelte/store';
import {
	FULL_SIZE_SIDEBAR,
	isMobile,
	SIDEBAR_COLLAPSED_SIZE
} from '../../styles/variables';

export type SidebarSize = 'small' | 'full' | 'normal';

const getWindowDimensions = () => ({
	width: window.innerWidth,
	height: window.innerHeight
});

export const windowDimensions = readable(
	browser ? getWindowDimensions() : { width: 1200, height: 800 },
	(set) => {
		const resize = () => set(getWindowDimensions());

		if (browser) {
			window.addEventListener('resize', resize);

			return () => {
				window.removeEventListener('resize', resize);
			};
		}
	}
);

export const mobileView = derived(windowDimensions, ($windowDimensions) =>
	isMobile($windowDimensions.width)
);

export const sideBarSize = derived(
	windowDimensions,
	($windowDimensions) => {
		const isCollapsed = $windowDimensions.width < SIDEBAR_COLLAPSED_SIZE;

		const leftSidebarFullSize =
			$windowDimensions.width < FULL_SIZE_SIDEBAR;
		return (
			leftSidebarFullSize ? 'full' : isCollapsed ? 'small' : 'normal'
		) as SidebarSize;
	}
);
