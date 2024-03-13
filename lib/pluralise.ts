/**
 * The `pluralise` function takes a number and a string as input and returns the string with an "s"
 * added at the end if the number is not equal to 1.
 * @param {number} total - The `total` parameter is a number representing the total count of something.
 * @param {string} string - The `string` parameter in the `pluralise` function is the word that you
 * want to pluralize based on the `total` parameter.
 * @returns The function `pluralise` returns the input string with an "s" added at the end if the total
 * is not equal to 1, otherwise it returns the input string as is.
 */
const pluralise = (total: number, string: string) => {
	console.log({ total });
	return total === 1 ? string : `${string}s`;
};

export default pluralise;
