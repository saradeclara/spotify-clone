/**
 * The function getRandomInt(max) returns a random integer between 0 (inclusive) and the specified
 * maximum value (exclusive).
 * @param {number} max - The `max` parameter in the `getRandomInt` function represents the maximum
 * value (exclusive) that the random integer should be generated within.
 * @returns A random integer between 0 (inclusive) and the specified `max` value (exclusive) is being
 * returned.
 */
function getRandomInt(max: number) {
	return Math.floor(Math.random() * max);
}

export default getRandomInt;
