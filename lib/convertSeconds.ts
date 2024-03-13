/**
 * The `convertSeconds` function in TypeScript converts a duration in seconds to a formatted time
 * string.
 * @param {number | undefined} durationInSeconds - The `durationInSeconds` parameter represents the
 * total duration in seconds that you want to convert into a time format.
 * @param {string} [format] - The `format` parameter in the `convertSeconds` function allows you to
 * specify how you want the output to be formatted. If you provide the value "hhhh mmmm ssss" for the
 * `format` parameter, the function will return the time in an expanded format with hours, minutes,
 * @returns The `convertSeconds` function returns either an expanded time string in the format "hhhh
 * mmmm ssss" or a default time string in the format "hh:mm:ss" based on the input parameters. If the
 * `durationInSeconds` is undefined, it returns "00:00:00".
 */

const convertSeconds = (
	durationInSeconds: number | undefined,
	format?: string
) => {
	if (typeof durationInSeconds === "undefined") return "00:00:00";

	const numberOfHours = Math.floor(durationInSeconds / 3600);
	const numberOfMinutes =
		Math.floor(durationInSeconds / 60) - numberOfHours * 60;
	const numberOfSeconds =
		durationInSeconds - (numberOfHours * 3600 + numberOfMinutes * 60);

	switch (format) {
		case "hhhh mmmm ssss":
			return renderExpandedString({
				h: numberOfHours,
				m: numberOfMinutes,
				s: numberOfSeconds,
			});
		default:
			return renderString({
				h: numberOfHours,
				m: numberOfMinutes,
				s: numberOfSeconds,
			});
	}
};

/**
 * The function `numberOfDigits` takes a number as input and returns the number of digits in that
 * number.
 * @param {number} number - The `number` parameter is a number that you want to determine the number of
 * digits for.
 * @returns The function `numberOfDigits` returns the number of digits in the input number.
 */
const numberOfDigits = (number: number) => {
	return number.toString().split("").length;
};

/**
 * The function `renderExpandedString` takes a duration object with hours, minutes, and seconds
 * properties and returns a formatted string representing the duration in hours, minutes, and seconds.
 * @param duration - {
 * @returns The function `renderExpandedString` returns a string that represents the duration object in
 * an expanded format, including hours, minutes, and seconds.
 */
const renderExpandedString = (duration: {
	h: number;
	m: number;
	s: number;
}) => {
	const hours = duration.h > 0 ? `${duration.h} hours` : null;
	const minutes =
		duration.h === 0 && duration.m === 0 ? null : `${duration.m} minutes`;
	const seconds = `${duration.s} seconds`;

	const tempArray = [hours, minutes, seconds];
	return tempArray.join(" ");
};

/**
 * The `renderString` function takes an object with hours, minutes, and seconds properties, formats
 * them as a time string (HH:MM:SS), and removes leading zeros from hours if present.
 * @param duration - The `duration` parameter is an object with three properties: `h` for hours (a
 * number), `m` for minutes (a number), and `s` for seconds (a number).
 * @returns The function `renderString` takes an object `duration` with properties `h`, `m`, and `s`
 * representing hours, minutes, and seconds respectively. It converts each value to a string, ensuring
 * that each value is represented with two digits (e.g., adding a leading zero if necessary). If the
 * hours value is "00", it is removed from the array. Finally, the function prints out the time string
 * in the HH:MM:SS format.
 */
const renderString = (duration: { h: number; m: number; s: number }) => {
	let tempArray: string[] = [];
	Object.values(duration).map((el) => {
		const tempString =
			numberOfDigits(el) === 2 ? el.toString() : `0${el.toString()}`;
		tempArray.push(tempString);
	});

	if (tempArray[0] === "00") {
		tempArray.shift();
	}

	return tempArray.join(":");
};

export default convertSeconds;
