/* eslint-disable import/no-anonymous-default-export */
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { jwtPayload, reqBodyTypes } from "@/types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password }: reqBodyTypes = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user && bcrypt.compareSync(password, user.password)) {
    const { id, email } = user;
    const payload: jwtPayload = {
      id,
      email,
      time: Date.now(),
    };
    const token = jwt.sign(payload, "hello", {
      expiresIn: "8h",
    });

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
    res.status(401);
    res.json({ error: "Email or Password is wrong" });
  }
};
