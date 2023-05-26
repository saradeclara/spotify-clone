import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const main = async () => {
	const salt = bcrypt.genSaltSync();

	// update user
	const updateWithPassword = await prisma.user.update({
		where: { email: "saradeclara@gmail.com" },
		data: { password: bcrypt.hashSync("password", salt) },
	});
};

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
