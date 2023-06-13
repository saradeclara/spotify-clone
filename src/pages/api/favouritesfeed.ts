import { validateRoute } from "../../../lib/auth";
import prisma from "../../../lib/prisma";

export default validateRoute(async (_req, res, user) => {
	const currentUserWithFavourites = await prisma.user.findUnique({
		where: { id: user?.id },
		include: {
			playlists: { include: { Category: true, User: true } },
			favouriteArtists: { include: { Category: true } },
			favouriteAlbums: { include: { artist: true, Category: true } },
			favouriteShows: { include: { Category: true } },
		},
	});

	let feed;
	if (currentUserWithFavourites) {
		feed = [
			...currentUserWithFavourites?.playlists,
			...currentUserWithFavourites?.favouriteArtists,
			...currentUserWithFavourites?.favouriteAlbums,
			...currentUserWithFavourites?.favouriteShows,
		];
	}
	res.json(feed);
});
