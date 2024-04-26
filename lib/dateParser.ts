interface parsedDate {
	day: number;
	month: { number: number | undefined; text: string | undefined };
	year: number;
	time: { h: string; m: string; s: string };
}

const monthDictionary: dictionaryType[] = [
	{ text: "January", number: 1 },
	{ text: "February", number: 2 },
	{ text: "March", number: 3 },
	{ text: "April", number: 4 },
	{ text: "May", number: 5 },
	{ text: "June", number: 6 },
	{ text: "July", number: 7 },
	{ text: "August", number: 8 },
	{ text: "September", number: 9 },
	{ text: "October", number: 10 },
	{ text: "November", number: 11 },
	{ text: "December", number: 12 },
];

/**
 * parses date into object containing all elements from original date (month, day, year, time)
 * @param date date
 * @returns object with parsed elements from date
 */
const dateParser = (date: Date | undefined): parsedDate | null => {
	if (typeof date === "undefined") return null;

	const day = date.getUTCDate();
	const monthNumber = date.getUTCMonth() + 1;
	const month = {
		number: monthNumber,
		text: monthParsed(monthNumber, monthDictionary),
	};
	const year = date.getUTCFullYear();

	const timeArray = date
		.toISOString()
		.split("T")[1]
		.split("Z")[0]
		.split(".")[0]
		.split(":");

	const time = { h: timeArray[0], m: timeArray[1], s: timeArray[2] };

	return { day, month, year, time };
};

interface dictionaryType {
	text: string;
	number: number;
}

/**
 * The function `monthParsed` takes a number representing a month and a dictionary of month mappings,
 * then returns the corresponding month text if found.
 * @param {number} number - The `number` parameter is the numerical value of the month that you want to
 * parse. It should be a number between 1 and 12 representing the month of the year.
 * @param {dictionaryType[]} dictionary - The `dictionary` parameter is an array of objects with the
 * following structure: { text: string; number: number }.
 * @returns The function `monthParsed` returns the text value of the month corresponding to the input
 * number if it is found in the provided `dictionary` array. If the number is not within the range of 1
 * to 12 or if the month is not found in the `dictionary`, an Error is thrown.
 */
const monthParsed = (number: number, dictionary: dictionaryType[]) => {
	if (number < 1 || number > 12) throw Error;

	const foundMonth = Object.values(dictionary).find(
		(el) => el.number === number
	);

	return foundMonth?.text;
};

export default dateParser;
