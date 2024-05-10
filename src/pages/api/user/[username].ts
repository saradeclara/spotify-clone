/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { username } = req.query;

	if (typeof username === "string") {
		const currentUser = await prisma.user.findUnique({
			where: {
				username,
			},
			include: {
				createdPlaylists: { include: { category: true } },
				favouritePlaylists: { include: { category: true } },
				userFollowers: true,
				artistFollowers: { include: { category: true } },
				userFollowing: true,
				artistFollowing: { include: { category: true } },
				favouriteSongs: { include: { category: true } },
				favouriteAlbums: { include: { category: true } },
				favouriteShows: { include: { category: true } },
			},
		});

		if (currentUser) {
			const userWithStats = {
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

			res.status(200);
			res.json(userWithStats);
		}
	}
};
