import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
const protectedPages: string[] = ["/", "/playlist", "/library"];

export default function middleware(
	req: NextRequest & {
		nextUrl: { pathname: string };
		cookies: RequestCookies & { FAKE_SPOTIFY_ACCESS_TOKEN: string };
	}
) {
	const cookiesValue = req.cookies.get("FAKE_SPOTIFY_ACCESS_TOKEN")?.value;
	if (!cookiesValue) {
		const url = req.nextUrl.clone();
		url.pathname = "/signin";
		return NextResponse.redirect(url);
	}
}

export const config = {
	matcher: [
		"/",
		"/user/:path*",
		"/album/:path*",
		"/artist/:path*",
		"/playlist/:path*",
		"/show/:path*",
		"/song/:path*",
	],
};
