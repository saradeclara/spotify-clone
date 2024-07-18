/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async (_req: NextApiRequest, res: NextApiResponse) => {
	const allSongs = await prisma.song.findMany({
		include: {
			album: true,
			artist: true,
		},
	});

	res.json(allSongs);
};
