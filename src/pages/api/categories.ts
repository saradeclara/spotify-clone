import { validateRoute } from "../../../lib/auth";
import prisma from "../../../lib/prisma";

export default validateRoute(async (_req, res, user) => {
	const categories = await prisma.category.findMany();

	res.json(categories);
});
