import { validateRoute } from "../../../lib/auth";
import prisma from "../../../lib/prisma";

export default validateRoute(async (req, res, user) => {
	console.log("body", req.body);
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
		console.log({ updatedUser });
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
		console.log({ updatedUser });
		res.json(updatedUser);
	}
});
