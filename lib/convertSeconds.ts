/**
 * converts seconds (s) to HH:MM:SS format
 * @param durationInSeconds duration of a song in seconds
 * @returns string containing number of hours, minutes and seconds
 */
const convertSeconds = (durationInSeconds: number | undefined) => {
	if (typeof durationInSeconds === "undefined") return "00:00:00";

	const numberOfHours = Math.floor(durationInSeconds / 3600);
	const numberOfMinutes =
		Math.floor(durationInSeconds / 60) - numberOfHours * 60;
	const numberOfSeconds =
		durationInSeconds - (numberOfHours * 3600 + numberOfMinutes * 60);

	const newFormat = {
		h: numberOfHours,
		m: numberOfMinutes,
		s: numberOfSeconds,
	};
	return renderString(newFormat);
};

const numberOfDigits = (number: number) => {
	return number.toString().split("").length;
};

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
