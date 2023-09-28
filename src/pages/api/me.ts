import { validateRoute } from "../../../lib/auth";
import prisma from "../../../lib/prisma";

export default validateRoute(async (_req, res, user) => {
	const currentUser = await prisma.user.findUnique({
		where: { id: user?.id },
		include: {
			createdPlaylists: { include: { Category: true } },
			favouriteSongs: true,
			favouritedPlaylists: { include: { Category: true } },
			followedBy: true,
			followedByArtist: {
				include: { albums: true, songs: true, Category: true },
			},
			following: true,
			followingArtist: {
				include: { albums: true, songs: true, Category: true },
			},
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
						currentUser.favouritedPlaylists.length,
				},
				{
					label: "follower",
					total:
						currentUser.followedBy.length + currentUser.followedByArtist.length,
				},
				{
					label: "following",
					total:
						currentUser.following.length + currentUser.followingArtist.length,
				},
			],
		};
		res.json(currentUserWithStats);
	}
});
