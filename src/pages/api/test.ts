import { validateRoute } from "../../../lib/auth";

// export default async (req: NextApiRequest, res: NextApiResponse) => {
// 	res.json("TEST");
// };

export default validateRoute(async (req, res, user) => {
	console.log("body", req.body);
	if (req.method === "PUT") {
		console.log("PUT METHOD");
		res.json(req.body);
	} else {
		res.status(405).json({
			message: "Method not allowed",
			success: false,
		});
	}

	// const categories = await prisma.category.findMany();

	// res.json(categories);
});
