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
	const { itemId, category }: { itemId: string; category: string } = req.body;

	// check if show is in favouriteShows of current user
	if (user) {
		const categoryList = getCategory(user, category);
		const isItemInCategoryList = [...categoryList].filter(
			(item) => item.id === itemId
		);

		if (isItemInCategoryList.length === 0) {
			// if show is not in favouriteShows, add it
			const updatedUser = await prisma.user.update({
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
			res.json(updatedUser);
		} else {
			// if show is in favouriteShows, remove it
			const updatedUser = await prisma.user.update({
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
			res.json(updatedUser);
		}
	}
});

// import { validateRoute } from "../../../lib/auth";
// import prisma from "../../../lib/prisma";

// // const getFeed = (user: ExtendedUser) => {
// // 	let feed: any;
// // 	Object.entries(user).forEach((el) => {
// // 		if (Array.isArray(el[1])) {
// // 			const newElement = {
// // 				[el[0]]: el[1],
// // 			};

// // 			feed = { ...feed, ...newElement };
// // 		}
// // 	});

// // 	return feed;
// // };

// // const getCategory = (
// // 	feed: { [x: string]: (Song | Album | Song | Playlist | Artist)[] },
// // 	categoryName: string
// // ) => {};

// export default validateRoute(async (req, res, user) => {
// 	const { itemId, category }: { itemId: string; category: string } = req.body;
// 	const keys = [
// 		"favouriteShows",
// 		"favouritePlaylists",
// 		"favouriteSongs",
// 		"artistFollowing",
// 		"favouriteAlbums",
// 	];

// 	// check if item is in category of current user
// 	if (user) {
// 		// const feed = getFeed(user);
// 		// const categoryList = getCategory(feed, category);
// 		const categoryList = user[category];
// 		if (categoryList) {
// 			const isItemInCategoryList = [...categoryList].find(
// 				(item) => item.id === itemId
// 			);

// 			if (typeof isItemInCategoryList === "undefined") {
// 				// if item is not in corresponding category list, add it
// 				const updatedUser = await prisma.user.update({
// 					where: {
// 						id: user.id,
// 					},
// 					include: {
// 						favouriteAlbums: true,
// 						favouritePlaylists: true,
// 						favouriteSongs: true,
// 						createdPlaylists: true,
// 						userFollowers: true,
// 						userFollowing: true,
// 						artistFollowers: true,
// 						artistFollowing: true,
// 						favouriteShows: { include: { category: true } },
// 					},
// 					data: {
// 						favouriteShows: {
// 							connect: { id: itemId },
// 						},
// 					},
// 				});

// 				res.json(updatedUser);
// 			} else {
// 				// if item is in corresponding category list, remove it
// 				const updatedUser = await prisma.user.update({
// 					where: {
// 						id: user.id,
// 					},
// 					include: {
// 						favouriteAlbums: true,
// 						favouritePlaylists: true,
// 						favouriteSongs: true,
// 						createdPlaylists: true,
// 						userFollowers: true,
// 						userFollowing: true,
// 						artistFollowers: true,
// 						artistFollowing: true,
// 						favouriteShows: { include: { category: true } },
// 					},
// 					data: {
// 						favouriteShows: {
// 							disconnect: { id: itemId },
// 						},
// 					},
// 				});

// 				res.json(updatedUser);
// 			}
// 		}

// 		// const isItemInCategory =
// 		// const isShowInUserFavourites = [...user.favouriteShows].filter(
// 		// 	(show) => show.id === showId
// 	}
// });
// // if (isShowInUserFavourites.length === 0) {
// // 	// if show is not in favouriteShows, add it
// // 	const updatedUser = await prisma.user.update({
// // 		where: {
// // 			id: user.id,
// // 		},
// // 		include: {
// // 			favouriteAlbums: true,
// // 			favouritePlaylists: true,
// // 			favouriteSongs: true,
// // 			createdPlaylists: true,
// // 			userFollowers: true,
// // 			userFollowing: true,
// // 			artistFollowers: true,
// // 			artistFollowing: true,
// // 			favouriteShows: { include: { category: true } },
// // 		},
// // 		data: {
// // 			favouriteShows: {
// // 				connect: { id: showId },
// // 			},
// // 		},
// // 	});
// // 	res.json(updatedUser);
// // } else {
// // 	// if show is in favouriteShows, remove it
// // 	const updatedUser = await prisma.user.update({
// // 		where: {
// // 			id: user.id,
// // 		},
// // 		include: {
// // 			favouriteAlbums: true,
// // 			favouritePlaylists: true,
// // 			favouriteSongs: true,
// // 			createdPlaylists: true,
// // 			userFollowers: true,
// // 			userFollowing: true,
// // 			artistFollowers: true,
// // 			artistFollowing: true,
// // 			favouriteShows: { include: { category: true } },
// // 		},
// // 		data: {
// // 			favouriteShows: {
// // 				disconnect: { id: showId },
// // 			},
// // 		},
// // 	});
// // 	res.json(updatedUser);
// // }
// // 	}
// // });
