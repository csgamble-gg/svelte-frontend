import Big from 'big.js';

const convertPenniesToDollars = (
	pennies: number,
	fixed?: number
): number | string => {
	const num = new Big(pennies).div(100);
	return fixed ? num.toFixed(fixed) : num.toNumber();
};

const convertDollarsToPennies = (dollars: number): number => {
	return new Big(dollars).times(100).toNumber();
};

export { convertPenniesToDollars, convertDollarsToPennies };
