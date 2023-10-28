import { Album, Artist, Playlist, Show, Song, User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "./prisma";

export type ExtendedUser = User & {
	favouriteShows: Show[];
	favouriteAlbums: Album[];
	favouritePlaylists: Playlist[];
	favouriteSongs: Song[];
	artistFollowing: Artist[];
};

export const validateRoute = (
	handler: (
		arg0: NextApiRequest,
		arg1: NextApiResponse,
		arg2: ExtendedUser | undefined | null
	) => any
) => {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		const { FAKE_SPOTIFY_ACCESS_TOKEN: token } = req.cookies;

		if (token) {
			let user;

			const decodedToken = jwt.verify(token, "hello");

			if (typeof decodedToken !== "string") {
				try {
					user = await prisma.user.findUnique({
						where: { id: decodedToken.id },
						include: {
							favouriteShows: { include: { category: true } },
							favouriteAlbums: true,
							favouritePlaylists: true,
							favouriteSongs: true,
							artistFollowing: true,
						},
					});

					if (!user) throw new Error("Unknown User");
				} catch (error) {
					res.status(401);
					res.json({ error });
				}
			}
			return handler(req, res, user);
		}
	};
};
