import { validateRoute } from "../../../lib/auth";
import prisma from "../../../lib/prisma";

export default validateRoute(async (req, res, user) => {
	const { itemId } = req.body;

	// check if show is in favouriteShows of current user
	if (user) {
		const isShowInUserFavourites = [...user.favouriteShows].filter(
			(show) => show.id === itemId
		);

		if (isShowInUserFavourites.length === 0) {
			// if show is not in favouriteShows, add it
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
					favouriteShows: {
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
					favouriteShows: {
						disconnect: { id: itemId },
					},
				},
			});
			res.json(updatedUser);
		}
	}
});
