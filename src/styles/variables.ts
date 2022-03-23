export const breakPoints = {
	sidebarFullWidth: 768,
	tablet: 992,
	logoCollapse: 375
};

export const SIDEBAR_COLLAPSED_SIZE = 1200;
export const FULL_SIZE_SIDEBAR = breakPoints.sidebarFullWidth;

export const sizes = {
	sidebarSmallWidth: '320px',
	sidebarWidth: '208px',
	// leftSidebarWidth: '240px',
	sidebarMinimizedWidth: '60px',
	headerHeight: '60px',
	mobileFooterHeight: '60px',
	maxContainerWidth: '1200px',
	maxGameBoardWidth: '730px'
};

export const isMobile = (width: number) =>
	width < breakPoints.sidebarFullWidth;
