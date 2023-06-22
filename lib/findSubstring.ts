/**
 * Function which searches for substring within original string and returns an array of segments (matches and non matches)
 * @param string original string
 * @param substring substring
 * @returns array of segments containing matches for substring
 */
const findSubstring = (
	string: string,
	substring: string
): { match: boolean; text: string }[] => {
	let results: { match: boolean; text: string }[] = [];
	let matches: any[] = [];

	substring = substring.toLowerCase();

	const IsSubstring = string.toLowerCase().includes(substring);

	if (IsSubstring) {
		let tempMatch: any[] = [];
		string
			.toLowerCase()
			.split("")
			.forEach((char, index, mainArray) => {
				if (char === substring[0]) {
					if (substring.length > 1) {
						const newArray = new Array(substring.length).fill(0);

						newArray.forEach((_el, indexEl) => {
							if (substring[indexEl] === mainArray[index + indexEl]) {
								const newElement = {
									match: mainArray[index + indexEl],
									index: index + indexEl,
								};
								tempMatch.push(newElement);
							} else {
								tempMatch = [];
							}
						});

						if (tempMatch.length === substring.length) {
							const newResult = {
								match: substring,
								start: index,
								end: index + tempMatch.length,
							};
							matches.push(newResult);
							tempMatch = [];
						}
					} else {
						const newElement = { match: char, start: index, end: index + 1 };
						// confirm findings by transferring to results array
						matches = [...matches, newElement];
						tempMatch = [];
					}
				}
			});
	} else {
		return results;
	}
	matches.forEach((segment, index, array) => {
		if (index === 0 && segment.start !== 0) {
			const firstSegment = {
				text: string.slice(0, segment.start),
				match: false,
			};
			results.push(firstSegment);
		}

		const tempSegment = {
			text: string.slice(segment.start, segment.end),
			match: true,
		};
		results.push(tempSegment);

		if (array[index + 1] && array[index + 1].start - array[index].end !== 0) {
			const midSegment = {
				text: string.slice(array[index].end, array[index + 1].start),
				match: false,
			};
			results.push(midSegment);
		}

		if (index === array.length - 1 && segment.end !== string.length) {
			const lastSegment = {
				text: string.slice(segment.end, string.length),
				match: false,
			};
			results.push(lastSegment);
		}
	});
	return results;
};

export default findSubstring;
