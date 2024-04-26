import {
	Album,
	Artist,
	Category,
	Playlist,
	Show,
	Song,
	User,
} from "@prisma/client";

// type FeedElement = Show &
// 	Artist &
// 	Album &
// 	User &
// 	Song & {
// 		category?: { description?: string };
// 		artist?: { name?: string };
// 		album?: { avatarUrl?: string };
// 		author?: string;
// 	};
type FeedElement = (Artist | Album | User | Playlist | Show | Song) & {
	category?: Category;
	artist?: Artist;
	album?: Album;
	artistId?: string;
	releasedOn?: Date;
	createdBy?: User;
};

/**
 * The function `generateResultGrid` takes an array of `FeedElement` objects and a row length, and
 * organizes the elements into a grid with the specified number of elements within each row.
 * @param {FeedElement[]} array - The `array` parameter is an array of `FeedElement` objects.
 * @param {number} rowLength - The `rowLength` parameter specifies the number of elements that should
 * be present in each row of the resulting grid.
 * @returns The function `generateResultGrid` returns a 2D array of `FeedElement` elements, where each
 * sub-array represents a row of elements based on the specified `rowLength`.
 */
const generateResultGrid = (array: FeedElement[], rowLength: number) => {
	let result: FeedElement[][] = [];
	let tempRow: FeedElement[] = [];
	array.forEach((singleChar: FeedElement) => {
		if (tempRow.length < rowLength) {
			tempRow.push(singleChar);
		} else {
			result.push(tempRow);
			tempRow = [];
		}
	});
	result.push(tempRow);
	return result;
};

export default generateResultGrid;

export type { FeedElement };
