import { getCookie } from './cookie';

export const getSession = (): string => getCookie('session');
