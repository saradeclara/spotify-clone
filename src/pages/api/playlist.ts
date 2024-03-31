import { validateRoute } from "../../../lib/auth";
import prisma from "../../../lib/prisma";

export default validateRoute(async (req, res, user) => {
	if (req.method === "POST") {
		const playlistCategory = await prisma.category.findFirst({
			where: {
				description: "playlist",
			},
		});

		if (playlistCategory && user) {
			const newPlaylist = await prisma.playlist.create({
				data: {
					name: `TEST ${Math.random() * 10}`,
					categoryId: playlistCategory.id,
					userId: user.id,
				},
			});

			res.status(200).json(newPlaylist);
		}
	} else {
		res.setHeader("Allow", ["POST"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
});
