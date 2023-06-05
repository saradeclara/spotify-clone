import { validateRoute } from "../../../lib/auth";
import prisma from "../../../lib/prisma";

export default validateRoute(async (_req, res, user) => {
	const currentUserWithArtists = await prisma.user.findUnique({
		where: { id: user?.id },
		include: {
			favouriteArtists: {
				include: {
					Category: true,
				},
			},
		},
	});

	res.json(currentUserWithArtists?.favouriteArtists);
});
