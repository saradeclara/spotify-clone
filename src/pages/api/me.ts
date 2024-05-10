import { validateRoute } from "../../../lib/auth";
import prisma from "../../../lib/prisma";

export default validateRoute(async (req, res, user) => {
	const { newUser } = req.body;
	switch (req.method) {
		case "GET":
			{
				const currentUser = await prisma.user.findUnique({
					where: { id: user?.id },
					include: {
						favouriteShows: { include: { category: true } },
						createdPlaylists: { include: { category: true, createdBy: true } },
						favouriteSongs: true,
						favouritePlaylists: {
							include: { category: true, createdBy: true },
						},
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
			break;
		case "PUT":
			{
				if (newUser && req.body) {
					const isUserInFollowing =
						user.userFollowing.filter(
							(singleUser) => singleUser.id === newUser.id
						).length > 0;

					if (isUserInFollowing) {
						// remove newUser from following
						const updatedFollowing = await prisma.user.update({
							where: {
								id: user.id,
							},
							data: {
								userFollowing: {
									disconnect: { id: newUser.id },
								},
							},
						});

						res.status(200);
						res.json({
							message: `You do not follow ${newUser.firstName} ${newUser.lastName} anymore.`,
							flag: "remove",
						});
					} else {
						// add newUser to following
						const updatedFollowing = await prisma.user.update({
							where: {
								id: user.id,
							},
							data: {
								userFollowing: {
									connect: { id: newUser.id },
								},
							},
						});

						res.status(200);
						res.json({
							message: `You now follow ${newUser.firstName} ${newUser.lastName}`,
							flag: "add",
						});
					}
				}
			}
			break;

		default:
			{
				res.setHeader("Allow", ["PUT", "GET"]);
				res.status(405).end(`Method ${req.method} Not Allowed`);
			}
			break;
	}
});
