/**
 * Returns month (string) from standard ISO string date
 * @param ISODate ISO string date
 * @returns month extracted from ISO date
 */

const returnYearFromDate = (ISODate: string | undefined) => {
	let result;
	if (typeof ISODate === "string") {
		const parsedDate = ISODate.split("-");
		result = parsedDate[0];
	} else {
		result = "";
	}

	return result;
};

export default returnYearFromDate;
