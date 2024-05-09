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
	userFollowing: User[];
};
/**
 * The `validateRoute` function validates a route handler by checking for an
 * access token in the request cookies and verifying it before executing the handler with the user
 * information.
 * @param handler - The `handler` parameter in the `validateRoute` function is a function that takes
 * three arguments:
 * @returns The `validateRoute` function is returning an asynchronous function that checks for a token
 * in the request cookies. If a token is found, it decodes the token using jwt.verify and then attempts
 * to find a user in the database using the decoded token's id. If a user is found, it calls the
 * `handler` function with the request, response, and user as arguments.
 */

export const validateRoute = (
	handler: (
		arg0: NextApiRequest,
		arg1: NextApiResponse,
		arg2: ExtendedUser
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
							favouriteAlbums: { include: { category: true } },
							favouritePlaylists: { include: { category: true } },
							createdPlaylists: { include: { category: true } },
							favouriteSongs: { include: { category: true } },
							artistFollowing: { include: { category: true } },
							userFollowing: true,
						},
					});

					if (!user) throw new Error("Unknown User");
				} catch (error) {
					res.status(401);
					res.json({ error });
				}
			}
			if (user) {
				return handler(req, res, user);
			}
		}
	};
};
