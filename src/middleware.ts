import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: ["/api/(.*)"],
  afterAuth: async (auth, req) => {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    if (
      auth.userId &&
      req.nextUrl.pathname === "/members" &&
      auth.sessionClaims.publicMetadata?.stripe?.payment !== "paid"
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (
      auth.userId &&
      req.nextUrl.pathname === "/members" &&
      auth.sessionClaims.publicMetadata?.stripe?.payment === "paid"
    ) {
      return NextResponse.next();
    }

    if (auth.userId && req.nextUrl.pathname !== "/members") {
      return NextResponse.next();
    }

    if (auth.isPublicRoute) {
      return NextResponse.next();
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api)(.*)"],
};
