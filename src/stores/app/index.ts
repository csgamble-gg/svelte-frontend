import { cookieStore } from '$stores/extras';

export type SidebarOptions = 'hidden' | 'visible';

const togglesidebar: Record<SidebarOptions, SidebarOptions> = {
	hidden: 'visible',
	visible: 'hidden'
};

export const sidebarStore = (() => {
	let defaultValue = 'visible' as SidebarOptions;

	const store = cookieStore<SidebarOptions>(
		'sidebarVisibility',
		defaultValue
	);

	return {
		...store,
		toggle: () => store.update((val) => togglesidebar[val])
	};
})();
