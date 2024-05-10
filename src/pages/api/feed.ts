import { ExtendedUser, validateRoute } from "../../../lib/auth";
import prisma from "../../../lib/prisma";

const getCategory = (user: ExtendedUser, categoryName: string) => {
	switch (categoryName) {
		case "favouriteShows":
			return user.favouriteShows;
		case "favouritePlaylists":
			return user.favouritePlaylists;
		case "favouriteAlbums":
			return user.favouriteAlbums;
		case "artistFollowing":
			return user.artistFollowing;
		case "favouriteSongs":
			return user.favouriteSongs;
		default:
			return [];
	}
};

export default validateRoute(async (req, res, user) => {
	if (req.method === "GET") {
		const currentUserWithFavourites = await prisma.user.findUnique({
			where: { id: user?.id },
			include: {
				createdPlaylists: { include: { category: true, createdBy: true } },
				favouritePlaylists: { include: { category: true, createdBy: true } },
				artistFollowing: { include: { category: true } },
				favouriteAlbums: { include: { artist: true, category: true } },
				favouriteShows: { include: { category: true } },
				favouriteSongs: {
					include: { category: true, album: true, artist: true },
				},
			},
		});

		let feed;
		if (currentUserWithFavourites) {
			feed = [
				...currentUserWithFavourites.createdPlaylists,
				...currentUserWithFavourites.favouritePlaylists,
				...currentUserWithFavourites.artistFollowing,
				...currentUserWithFavourites.favouriteAlbums,
				...currentUserWithFavourites.favouriteShows,
				...currentUserWithFavourites.favouriteSongs,
			];
		}
		res.json(feed);
	} else if (req.method === "PUT") {
		const {
			itemId,
			category,
			name,
		}: { itemId: string; category: string; name: string } = req.body;
		// check if element is in favourites of current user
		if (user) {
			const categoryList = getCategory(user, category);
			const isItemInCategoryList = [...categoryList].filter(
				(item) => item.id === itemId
			);

			if (isItemInCategoryList.length === 0) {
				// if element is not in favourites, add it
				await prisma.user.update({
					where: {
						id: user.id,
					},
					include: {
						favouriteAlbums: { include: { category: true } },
						favouritePlaylists: { include: { category: true } },
						favouriteSongs: { include: { category: true } },
						createdPlaylists: { include: { category: true } },
						userFollowers: true,
						userFollowing: true,
						artistFollowers: { include: { category: true } },
						artistFollowing: { include: { category: true } },
						favouriteShows: { include: { category: true } },
					},
					data: {
						[category]: {
							connect: { id: itemId },
						},
					},
				});

				res
					.status(200)
					.json({
						action: "added",
						message: `${name} was added to your Favourites`,
					});
			} else {
				// if element is in favourites, remove it
				await prisma.user.update({
					where: {
						id: user.id,
					},
					include: {
						favouriteAlbums: true,
						favouritePlaylists: true,
						favouriteSongs: true,
						createdPlaylists: true,
						userFollowers: true,
						userFollowing: true,
						artistFollowers: true,
						artistFollowing: true,
						favouriteShows: { include: { category: true } },
					},
					data: {
						[category]: {
							disconnect: { id: itemId },
						},
					},
				});
				res
					.status(200)
					.json({
						action: "removed",
						message: `${name} was removed from your Favourites`,
					});
			}
		}
	}
});
