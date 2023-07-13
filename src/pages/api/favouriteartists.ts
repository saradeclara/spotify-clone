import { validateRoute } from "../../../lib/auth";
import prisma from "../../../lib/prisma";

export default validateRoute(async (_req, res, user) => {
	const currentUserWithArtists = await prisma.user.findUnique({
		where: { id: user?.id },
		include: {
			followingArtist: {
				include: {
					Category: true,
				},
			},
		},
	});

	if (currentUserWithArtists) {
		const firstFiveArtists = currentUserWithArtists.followingArtist.slice(0, 4);
		res.json(firstFiveArtists);
	}
});
