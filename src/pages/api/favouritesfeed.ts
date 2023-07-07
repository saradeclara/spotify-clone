import { validateRoute } from "../../../lib/auth";
import prisma from "../../../lib/prisma";

export default validateRoute(async (_req, res, user) => {
	const currentUserWithFavourites = await prisma.user.findUnique({
		where: { id: user?.id },
		include: {
			createdPlaylists: { include: { Category: true, createdBy: true } },
			favouritedPlaylists: { include: { Category: true, createdBy: true } },
			followingArtist: { include: { Category: true } },
			favouriteAlbums: { include: { artist: true, Category: true } },
			favouriteShows: { include: { Category: true } },
		},
	});

	let feed;
	if (currentUserWithFavourites) {
		feed = [
			...currentUserWithFavourites?.createdPlaylists,
			...currentUserWithFavourites?.favouritedPlaylists,
			...currentUserWithFavourites?.followingArtist,
			...currentUserWithFavourites?.favouriteAlbums,
			...currentUserWithFavourites?.favouriteShows,
		];
	}
	res.json(feed);
});
