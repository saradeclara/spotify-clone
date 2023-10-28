/**
 * returns array in alphabetical order (by name)
 * @param array favourites feed (album, artists, podcasts, playlists)
 * @returns sorted array (alphabetically)
 */
const sortAlphabetical = (array: any[]) => {
	if (typeof array !== "object") throw Error;

	array.sort((a: { name: number }, b: { name: number }) => {
		if (a.name < b.name) {
			return -1;
		}
		if (a.name > b.name) {
			return 1;
		}
		return 0;
	});

	return array;
};

/**
 * returns array sorted by creation date (more recent first)
 * @param array favourites feed (album, artists, podcasts, playlists)
 * @returns sorted array (by creation date)
 */
const sortRecents = (array: any[]) => {
	if (typeof array !== "object") throw Error;

	array.sort((a, b) => {
		if (b.createdAt < a.createdAt) {
			return -1;
		}
		if (b.createdAt > a.createdAt) {
			return 1;
		}
		return 0;
	});
	return array;
};

/**
 * returns array sorted by latest update date (more recent first)
 * @param array favourites feed (album, artists, podcasts, playlists)
 * @returns sorted array (by latest update date)
 */
const sortRecentlyAdded = (array: any[]) => {
	if (typeof array !== "object") throw Error;
	array.sort((a, b) => {
		if (b.updatedAt < a.updatedAt) {
			return -1;
		}
		if (b.updatedAt > a.updatedAt) {
			return 1;
		}
		return 0;
	});
	return array;
};

/**
 * returns array sorted by creator (alphabetical order)
 * @param array favourites feed (album, artists, podcasts, playlists)
 * @returns sorted array (by author/artist)
 */
const sortCreator = (array: any[]) => {
	if (typeof array !== "object") throw Error;

	// remapping authors
	const arrayOfAuthors = array.map((singleRecord, index) => {
		switch (singleRecord.Category.description) {
			case "album":
				return { index, name: singleRecord.artist?.name };
			case "artist":
				return { index, name: singleRecord.name };
			case "playlist":
				return {
					index,
					name:
						singleRecord.User?.firstName + " " + singleRecord.User?.lastName,
				};
			case "show":
				return { index, name: singleRecord.author };
			default:
				break;
		}
	});

	arrayOfAuthors.sort((a, b) => {
		if (a?.name < b?.name) {
			return -1;
		}
		if (a?.name > b?.name) {
			return 1;
		}
		return 0;
	});

	const sorted: any[] = [];

	arrayOfAuthors.forEach((singleRecord) => {
		if (singleRecord) {
			sorted.push(array[singleRecord.index]);
		}
	});

	return sorted;
};

const searchText = (array: any[], textInput: string) => {
	if (typeof array !== "object") throw Error;

	let filtered;
	textInput = textInput.toLowerCase();
	if (textInput.length === 0) {
		return array;
	} else {
		filtered = array.filter((element) => {
			switch (element.Category.description) {
				case "album":
					return (
						element.name.toLowerCase().includes(textInput) ||
						element.artist.name.toLowerCase().includes(textInput)
					);
				case "artist":
					return element.name.toLowerCase().includes(textInput);
				case "playlist":
					return (
						element.name.toLowerCase().includes(textInput) ||
						element.createdBy.firstName.toLowerCase().includes(textInput) ||
						element.createdBy.lastName.toLowerCase().includes(textInput)
					);
				case "show":
					return (
						element.name.toLowerCase().includes(textInput) ||
						element.author.toLowerCase().includes(textInput)
					);
				default:
					break;
			}
		});
	}

	return filtered;
};

export {
	searchText,
	sortAlphabetical,
	sortCreator,
	sortRecentlyAdded,
	sortRecents,
};
