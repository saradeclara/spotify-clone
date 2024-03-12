/**
 * The function `sortAlphabetical` sorts an array of objects alphabetically based on the `name`
 * property.
 * @param {any[]} array - The `array` parameter is an array of elements that you want to sort
 * alphabetically based on the `name` property of each element.
 * @returns The `sortAlphabetical` function is returning the input array sorted in alphabetical order
 * based on the `name` property of the objects in the array.
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
 * The function `sortRecents` sorts an array of objects based on the `createdAt` property in descending
 * order.
 * @param {any[]} array - The `array` parameter is an array of elements that you want to sort based on
 * a property `createdAt` in each element. The `sortRecents` function sorts this array in descending
 * order based on the `createdAt` property of each element.
 * @returns The `sortRecents` function is returning the input array after sorting it based on the
 * `createdAt` property in descending order.
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
 * The function `sortRecentlyAdded` sorts an array of objects based on their `updatedAt` property in
 * descending order.
 * @param {any[]} array - The `array` parameter is an array of elements that you want to sort based on
 * their `updatedAt` property. The function `sortRecentlyAdded` takes this array as input and sorts it
 * in descending order based on the `updatedAt` property of each element.
 * @returns The `sortRecentlyAdded` function is returning the input array `array` sorted based on the
 * `updatedAt` property in descending order.
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
 * The function `sortCreator` takes an array of objects, remaps authors based on category description,
 * sorts them alphabetically by name, and returns the sorted array.
 * @param {any[]} array - The `sortCreator` function takes an array of objects as input. The objects in
 * the array represent different categories such as "album", "artist", "playlist", or "show". The
 * function sorts the array based on the names of the authors associated with each category. The
 * author's name is extracted
 * @returns The `sortCreator` function returns an array of objects sorted based on the names of authors
 * or artists extracted from the input array of records. The sorting is done based on the names of
 * authors or artists in ascending order.
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

// const sortingFeed = (data)

/**
 * The function `searchText` filters an array of objects based on a text input and specific properties
 * within each object.
 * @param {any[]} array - The `array` parameter is an array of objects that contain information about
 * different categories such as albums, artists, playlists, and shows.
 * @param {string} textInput - The `textInput` parameter is a string that represents the text input
 * provided by the user for searching within the array of objects.
 * @returns The function `searchText` returns an array of elements that match the search criteria based
 * on the `textInput` parameter. The elements are filtered based on their category description and
 * specific properties such as name, artist, createdBy, or author. The filtered array is then returned
 * by the function.
 */
const searchText = (array: any[], textInput: string) => {
	if (typeof array !== "object") throw Error;

	let filtered;
	textInput = textInput.toLowerCase();
	if (textInput.length === 0) {
		return array;
	} else {
		filtered = array.filter((element) => {
			switch (element.category.description) {
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
