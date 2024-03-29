import { validateRoute } from "../../../lib/auth";
import prisma from "../../../lib/prisma";

export default validateRoute(async (req, res, user) => {
	const { songId, flag } = req.body;
	const foundUser = await prisma.user.findUnique({
		where: {
			id: user?.id,
		},
		include: {
			favouriteSongs: true,
		},
	});

	if (flag) {
		// remove song
		const updatedUser = await prisma.user.update({
			where: { id: foundUser?.id },
			include: {
				favouriteSongs: true,
			},
			data: {
				favouriteSongs: {
					disconnect: { id: songId },
				},
			},
		});
		res.json(updatedUser);
	} else {
		// add song
		const updatedUser = await prisma.user.update({
			where: { id: foundUser?.id },
			include: {
				favouriteSongs: true,
			},
			data: {
				favouriteSongs: {
					connect: { id: songId },
				},
			},
		});
		res.json(updatedUser);
	}
});
