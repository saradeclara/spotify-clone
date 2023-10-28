import { validateRoute } from "../../../lib/auth";
import prisma from "../../../lib/prisma";

export default validateRoute(async (req, res, user) => {
	if (req.method !== "GET") {
		res.status(405).send({ message: "Only GET requests allowed" });
	}

	const currentUserWithFavourites = await prisma.user.findUnique({
		where: { id: user?.id },
		include: {
			createdPlaylists: { include: { category: true, createdBy: true } },
			favouritePlaylists: { include: { category: true, createdBy: true } },
			artistFollowing: { include: { category: true } },
			favouriteAlbums: { include: { artist: true, category: true } },
			favouriteShows: { include: { category: true } },
		},
	});

	let feed;
	if (currentUserWithFavourites) {
		feed = [
			...currentUserWithFavourites?.createdPlaylists,
			...currentUserWithFavourites?.favouritePlaylists,
			...currentUserWithFavourites?.artistFollowing,
			...currentUserWithFavourites?.favouriteAlbums,
			...currentUserWithFavourites?.favouriteShows,
		];
	}
	res.json(feed);
});
