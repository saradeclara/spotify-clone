import useSWR from "swr";
import fetcher from "./fetcher";
import {
	searchText,
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

export const useFeed = ({
	sort,
	search,
	catFilter,
}: {
	sort: string;
	search: string;
	catFilter: string | null;
}) => {
	let searched;
	let catFiltered;
	let sorted;

	const feed = useSWR("/favouritesfeed", fetcher);

	// search
	if (search.length > 0) {
		searched = searchText(feed.data, search);
	} else {
		searched = feed.data;
	}

	// category filter
	if (catFilter) {
		catFiltered = searched.filter(
			(singleRecord: any) => singleRecord.Category.description === catFilter
		);
	} else {
		catFiltered = searched;
	}

	// sort
	if (feed && feed.data && sort) {
		switch (sort) {
			case "Alphabetical":
				sorted = sortAlphabetical(catFiltered);
				break;
			case "Recents":
				sorted = sortRecents(catFiltered);
				break;
			case "Recently Added":
				sorted = sortRecentlyAdded(catFiltered);
				break;
			case "Creator":
				sorted = sortCreator(catFiltered);
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
