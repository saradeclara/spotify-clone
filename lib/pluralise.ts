const pluralise = (total: number, string: string) => {
	console.log({ total });
	return total === 1 ? string : `${string}s`;
};

export default pluralise;
