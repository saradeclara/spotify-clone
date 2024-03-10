export const fetchFeedData = async () => {
	const response = await fetch("/api/feed");
	if (!response.ok) throw new Error("Failed to fetch data");
	return response.json();
};

export const fetchFavouriteSongs = async () => {
	const response = await fetch("/api/favouritesongs");
	if (!response.ok) throw new Error("Failed to fetch data");
	return response.json();
};

export const fetchFavouriteEpisodes = async () => {
	const response = await fetch("/api/favouriteshows");
	if (!response.ok) throw new Error("Failed to fetch data");
	return response.json();
};
