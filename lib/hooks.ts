import useSWR from "swr";
import fetcher from "./fetcher";
import {
	sortAlphabetical,
	sortCreator,
	sortRecentlyAdded,
	sortRecents,
} from "./sort";

export const useMe = () => {
	const { data, error } = useSWR("/me", fetcher);

	return {
		user: data,
		isLoading: !data && !error,
		isError: error,
	};
};

export const usePlaylist = () => {
	const { data, error } = useSWR("/playlist", fetcher);

	return {
		playlists: data || [],
		isLoading: !data && !error,
		isError: error,
	};
};

export const useFeed = ({ sort }: { sort: string }) => {
	const feed = useSWR("/favouritesfeed", fetcher);
	let sorted;
	if (feed && feed.data && sort) {
		switch (sort) {
			case "Alphabetical":
				sorted = sortAlphabetical(feed.data);
				break;
			case "Recents":
				sorted = sortRecents(feed.data);
				break;
			case "Recently Added":
				sorted = sortRecentlyAdded(feed.data);
				break;
			case "Creator":
				sorted = sortCreator(feed.data);
				break;
			default:
				break;
		}
	}
	return {
		data: sorted,
		isLoading: feed.isLoading,
		error: feed.error,
	};
};

// export const useFavourites = () => {
// 	const categories = useSWR("/categories", fetcher);
// 	const favSongs = useSWR("/favouritesongs", fetcher);
// 	const favArtists = useSWR("/favouriteartists", fetcher);
// 	const favAlbums = useSWR("/favouritealbums", fetcher);
// 	const favShows = useSWR("/favouriteshows", fetcher);

// 	return {
// 		categories: categories.data || [],
// 		favouriteSongs: favSongs.data || [],
// 		favouriteArtists: favArtists.data || [],
// 		favouriteAlbums: favAlbums.data || [],
// 		favouriteShows: favShows.data || [],
// 	};
// };

// export const useFavouriteSongs = () => {
// 	const { data, error } = useSWR("/favouritesongs", fetcher);

// 	return {
// 		favouriteSongs: data || [],
// 		isLoading: !data && !error,
// 		isError: error,
// 	};
// };

// export const useFavouriteArtists = () => {
// 	const { data, error } = useSWR("/favouriteartists", fetcher);

// 	return {
// 		favouriteSongs: data || [],
// 		isLoading: !data && !error,
// 		isError: error,
// 	};
// };

// export const useFavouriteShows = () => {
// 	const { data, error } = useSWR("/favouriteshows", fetcher);

// 	return {
// 		favouriteSongs: data || [],
// 		isLoading: !data && !error,
// 		isError: error,
// 	};
// };

// export const useFavouriteAlbums = () => {
// 	const { data, error } = useSWR("/favouritealbums", fetcher);

// 	return {
// 		favouriteSongs: data || [],
// 		isLoading: !data && !error,
// 		isError: error,
// 	};
// };
