import { validateRoute } from "../../../lib/auth";
import prisma from "../../../lib/prisma";

export default validateRoute(async (_req, res, user) => {
	const currentUserWithAlbums = await prisma.user.findUnique({
		where: { id: user?.id },
		include: {
			favouriteAlbums: {
				include: {
					artist: true,
					category: true,
				},
			},
		},
	});

	res.json(currentUserWithAlbums?.favouriteAlbums);
});
