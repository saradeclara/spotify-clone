import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prisma from "../../../lib/prisma";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { jwtPayload } from "@/types";

type reqBodyTypes = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const salt = bcrypt.genSaltSync();
    const { email, password, firstName, lastName, isAdmin }: reqBodyTypes =
      req.body;

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

    if (user) {
      const { email, id } = user;
      const jwtPayload: jwtPayload = {
        email,
        id,
        time: Date.now(),
      };

      const token = jwt.sign(jwtPayload, "hello", { expiresIn: "8h" });

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("FAKE_SPOTIFY_ACCESS_TOKEN", token, {
          httpOnly: true,
          maxAge: 8 * 60 * 60,
          path: "/",
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        })
      );

      res.json(user);
    } else {
      const errorMessage = "only POST requests allowed on api/signup";
      res.status(404);
      res.json({ error: errorMessage });
    }
  }
};
