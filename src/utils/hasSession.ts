import Cookies from 'js-cookie';

export const hasSession = (): boolean => {
	const session = Cookies.get('session');

	return !!session;
};
