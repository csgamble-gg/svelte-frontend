import Big from 'big.js';

export const formatPennies = (value: number): string => {
	return new Big(value).div(100).toFixed(2);
};
