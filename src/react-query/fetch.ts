export const fetchFeedData = async () => {
	const response = await fetch("/api/feed");
	if (!response.ok) throw new Error("Failed to fetch data");
	return response.json();
};

export const fetchFavouriteSongs = async () => {
	const response = await fetch("/api/favourites/songs");
	if (!response.ok) throw new Error("Failed to fetch data");
	return response.json();
};

export const fetchFavouriteEpisodes = async () => {
	const response = await fetch("/api/favourites/shows");
	if (!response.ok) throw new Error("Failed to fetch data");
	return response.json();
};

export const fetchSongs = async () => {
	const response = await fetch("/api/songs");
	if (!response.ok) throw new Error("Failed to fetch data");
	return response.json();
};

export const fetchPlaylist = async (id: string) => {
	const response = await fetch(`/api/playlist/${id}`, {
		method: "GET",
	});
	if (!response.ok) throw new Error("Failed to fetch data");
	return response.json();
};

export const fetchCurrentUser = async (username: string) => {
	const response = await fetch(`/api/user/${username}`, {
		method: "GET",
	});
	if (!response.ok) throw new Error("Failed to fetch data");
	return response.json();
};
