import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "./prisma";

export const validateRoute = (
	handler: (
		arg0: NextApiRequest,
		arg1: NextApiResponse,
		arg2: User | null | undefined
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
					});

					if (!user) throw new Error("We do not know this user.");
				} catch (error) {
					res.status(401);
					res.json({ error });
				}
			}

			return handler(req, res, user);
		}
	};
};
