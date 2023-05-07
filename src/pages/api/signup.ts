import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prisma from "../../../lib/prisma";
import jwt from "jsonwebtoken";
import cookie from "cookie";

type reqBodyTypes = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const salt = bcrypt.genSaltSync();
  const { email, password, firstName, lastName, isAdmin } = req.body;

  let user;

  try {
    user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, salt),
        firstName,
        lastName,
        isAdmin,
      },
    });
  } catch (error) {
    res.status(401);
    res.json({ error });
    return;
  }

  const token = jwt.sign(
    {
      email: user?.email,
      id: user?.id,
      time: Date.now(),
    },
    "hello",
    { expiresIn: "8h" }
  );

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("TRAX_ACCESS_TOKEN", token, {
      httpOnly: true,
      maxAge: 8 * 60 * 60,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
  );

  res.json(user);
};
