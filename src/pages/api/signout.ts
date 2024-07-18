/* eslint-disable import/no-anonymous-default-export */
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async (_req: NextApiRequest, res: NextApiResponse) => {
	// clear cookie
	res.setHeader(
		"Set-Cookie",
		cookie.serialize("FAKE_SPOTIFY_ACCESS_TOKEN", "", {
			httpOnly: true,
			path: "/",
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
		})
	);
	/* `res.writeHead(302, { location: "/signin" });` is setting the response status code to 302, which is
    a redirect status code. It indicates that the requested resource has been temporarily moved to the
    URL specified in the `location` header, in this case, "/signin". */
	res.writeHead(302, { location: "/signin" });
	res.end();
};
