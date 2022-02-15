const sumArrayNumbers = (array: Array<{ amount: number }>): number => {
	return array.reduce((acc, curr) => {
		return acc + curr.amount;
	}, 0);
};

export default sumArrayNumbers;
