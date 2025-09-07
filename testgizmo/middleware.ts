import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    const enforce = process.env.ENFORCE_DASHBOARD_AUTH === "true";
    if (enforce) {
      const session = req.cookies.get("gizmo_session")?.value;
      if (!session) {
        const url = req.nextUrl.clone();
        url.pathname = "/signin";
        url.searchParams.set("next", req.nextUrl.pathname);
        return NextResponse.redirect(url);
      }
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};


