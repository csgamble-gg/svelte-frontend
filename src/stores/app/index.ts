import { cookieStore } from '$stores/extras';

export type VisibilityOptions = 'hidden' | 'visible';

const togglesidebar: Record<VisibilityOptions, VisibilityOptions> = {
	hidden: 'visible',
	visible: 'hidden'
};

export const sidebarStore = (() => {
	let defaultValue = 'visible' as VisibilityOptions;

	const store = cookieStore<VisibilityOptions>(
		'sidebarVisibility',
		defaultValue
	);

	return {
		...store,
		toggle: () => {
			store.update((val) => togglesidebar[val]);
		}
	};
})();

const toggleChat: Record<VisibilityOptions, VisibilityOptions> = {
	hidden: 'visible',
	visible: 'hidden'
};

type MobileToggleType =
	| {
			value: SidebarViewEnum;
			type: 'sidebar';
	  }
	| {
			type: 'leftSidebar';
	  };

export const chatStore = (() => {
	let defaultValue = 'visible' as VisibilityOptions;

	const store = cookieStore<VisibilityOptions>(
		'chatVisibility',
		defaultValue
	);

	return {
		...store,
		toggle: () => store.update((val) => toggleChat[val])
	};
})();
