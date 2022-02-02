import Big from 'big.js';

export const formatCurrency = (
	value: number,
	currency?: string
): string => {
	return new Big(value).div(100).toFixed(2).toString();
};
