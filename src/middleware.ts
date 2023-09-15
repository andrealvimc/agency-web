import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    // # ADMIN
    if (
      request.nextUrl.pathname.includes("/dashboard/agencies") &&
      request.nextauth.token?.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }

    // # SELLER & MANAGER & CUSTOMER
    if (
      request.nextUrl.pathname.includes("/dashboard/crm") &&
      request.nextauth.token?.role !== "seller" &&
      request.nextauth.token?.role !== "manager" &&
      request.nextauth.token?.role !== "customer"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
