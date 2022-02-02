import Big from 'big.js';

export const doubleBet = (amount: string) => {
	return new Big(amount).times(2).toFixed(2);
};
