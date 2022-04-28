import { CurrencyEnum } from '$generated/graphql';
import { cookieStore } from '$stores/extras';

export const currency = cookieStore<CurrencyEnum>(
	'currency',
	CurrencyEnum.BTC
);

export const inPlayCurrency = currency;
