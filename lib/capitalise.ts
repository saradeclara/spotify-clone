/**
 * The function `capitalise` takes a string as input and returns the same string with the first letter
 * capitalized.
 * @param {string} string - A string that you want to capitalize the first letter of.
 * @returns The `capitalise` function returns the input string with the first letter capitalized.
 */
const capitalise = (string: string) => {
	if (string.length > 0) {
		return string[0].toUpperCase() + string.slice(1);
	}
};

export default capitalise;
