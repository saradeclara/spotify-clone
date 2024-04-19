/**
 * The function `getTopItems` takes an array of numbers and returns the top `max` number of items from
 * the array.
 * @param {number[]} array - An array of numbers.
 * @param {number} max - The `max` parameter in the `getTopItems` function represents the maximum
 * number of items you want to retrieve from the input `array`.
 * @returns The `getTopItems` function returns an array containing the top `max` number of items from
 * the input `array`.
 */
const getTopItems = (array: any[], max: number) => {
	return array.splice(0, max);
};

export default getTopItems;
