import { validateRoute } from "../../../../lib/auth";
import prisma from "../../../../lib/prisma";

export default validateRoute(async (_req, res, user) => {
	const currentUserWithShows = await prisma.user.findUnique({
		where: { id: user?.id },
		include: { favouriteShows: { include: { category: true } } },
	});

	res.json(currentUserWithShows?.favouriteShows);
});
