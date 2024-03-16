import { libraryTags } from "@/components/Sidebar/LibraryMenu";

/**
 * The function `sortAlphabetical` sorts an array of objects alphabetically based on the `name`
 * property.
 * @param {any[]} array - The `array` parameter is an array of elements that you want to sort
 * alphabetically based on the `name` property of each element.
 * @returns The `sortAlphabetical` function is returning the input array sorted in alphabetical order
 * based on the `name` property of the objects in the array.
 */
const sortAlphabetical = (array: any[]) => {
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
	// remapping authors
	const arrayOfAuthors = array.map((singleRecord, index) => {
		switch (singleRecord.category.description) {
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

/**
 * The function `sortingFeed` takes an array of data and a sort option, then returns the data sorted
 * based on the selected option.
 * @param {any[]} data - The `data` parameter is an array containing the items that need to be sorted.
 * @param {number} sortOption - The `sortOption` parameter determines how the `data` array should be
 * sorted. Here are the options:
 * @returns The function `sortingFeed` returns the sorted array based on the `sortOption` provided, like
 * creation/update data, alphabetical order or author/creator. If none of these options match, it returns the
 * original
 */
export const sortingFeed = (data: any[], sortOption: number) => {
	let sorted = [];
	switch (sortOption) {
		case 0:
			sorted = sortRecents(data);
			break;
		case 1:
			sorted = sortRecentlyAdded(data);
			break;
		case 2:
			sorted = sortAlphabetical(data);
			break;
		case 3:
			sorted = sortCreator(data);
			break;
		default:
			sorted = data;
	}
	return sorted;
};

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

/**
 * The function `filterAndSort` filters, sorts, and categorizes data based on text input, sort option,
 * and current category.
 * @param {any[]} data - The `data` parameter is an array containing the items to be filtered and
 * sorted.
 * @param {string} textInput - The `textInput` parameter is a string that represents the text input
 * used for filtering the data.
 * @param {number} sortOption - The `sortOption` parameter determines how the data will be sorted. It
 * is a number that represents a specific sorting option.
 * @param {number | null} currentCategory - The `currentCategory` parameter in the `filterAndSort`
 * function is used to filter the data based on a specific category. It is a number or `null`
 * indicating the current category selected by the user. If it is a number, the function filters the
 * data to include only items that belong
 * @returns The function `filterAndSort` returns the `filteredAndSortedData` array after applying
 * filtering based on text input, sorting based on the sort option, and optionally filtering based on
 * the current category.
 */
const filterAndSort = (
	data: any[],
	textInput: string,
	sortOption: number,
	currentCategory: number | null
) => {
	let filteredAndSortedData = [];
	if (!data) return [];

	// filter, text input
	filteredAndSortedData = searchText(data, textInput);

	// sort option
	filteredAndSortedData = sortingFeed(filteredAndSortedData, sortOption);

	// categories
	if (typeof currentCategory === "number") {
		filteredAndSortedData = filteredAndSortedData.filter((el) => {
			console.log("desc", el.category.description);
			return (
				el.category.description.toLowerCase() ===
				libraryTags[currentCategory].label.toLowerCase()
			);
		});
	}
	return filteredAndSortedData;
};

export {
	filterAndSort,
	searchText,
	sortAlphabetical,
	sortCreator,
	sortRecentlyAdded,
	sortRecents,
};
