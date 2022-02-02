import { cookieStore } from '$stores/extras';
import { CurrencyEnum } from '$types/index';

export const currency = cookieStore<CurrencyEnum>(
	'currency',
	CurrencyEnum.btc
);
