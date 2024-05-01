import { validateRoute } from "../../../lib/auth";
import prisma from "../../../lib/prisma";

export default validateRoute(async (req, res, user) => {
	if (req.method === "GET") {
		const currentUser = await prisma.user.findUnique({
			where: { id: user?.id },
			include: {
				favouriteShows: { include: { category: true } },
				createdPlaylists: { include: { category: true, createdBy: true } },
				favouriteSongs: true,
				favouritePlaylists: { include: { category: true, createdBy: true } },
				userFollowers: true,
				artistFollowers: {
					include: { albums: true, songs: true, category: true },
				},
				userFollowing: true,
				artistFollowing: {
					include: { albums: true, songs: true, category: true },
				},
				favouriteAlbums: { include: { category: true, artist: true } },
			},
		});

		if (currentUser) {
			const currentUserWithStats = {
				...currentUser,
				stats: [
					{
						label: "playlist",
						total:
							currentUser.createdPlaylists.length +
							currentUser.favouritePlaylists.length,
					},
					{
						label: "follower",
						total:
							currentUser.userFollowers.length +
							currentUser.artistFollowers.length,
					},
					{
						label: "following",
						total:
							currentUser.userFollowing.length +
							currentUser.artistFollowing.length,
					},
				],
			};
			res.json(currentUserWithStats);
		}
	}
});
