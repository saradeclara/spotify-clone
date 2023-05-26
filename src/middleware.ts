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
	if (
		protectedPages.find((singlePage) => singlePage === req.nextUrl.pathname)
	) {
		const cookiesValue = req.cookies.get("FAKE_SPOTIFY_ACCESS_TOKEN")?.value;
		if (!cookiesValue) {
			const url = req.nextUrl.clone();
			url.pathname = "/signin";
			return NextResponse.redirect(url);
		}
	}
}
