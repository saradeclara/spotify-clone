const pluralise = (total: number, string: string) => {
	return total === 1 ? string : `${string}s`;
};

export default pluralise;
