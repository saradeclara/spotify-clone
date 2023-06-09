import { validateRoute } from "../../../lib/auth";
import prisma from "../../../lib/prisma";

export default validateRoute(async (_req, res, user) => {
	const currentUserWithSongs = await prisma.user.findUnique({
		where: { id: user?.id },
		include: { favouriteSongs: true },
	});

	res.json(currentUserWithSongs?.favouriteSongs);
});
