import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(request: NextRequestWithAuth) {

    // const hasValidToken = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/me`, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${request.nextauth.token?.token}`,
    //   },
    // });

    // const result = await hasValidToken.json();

    // console.log(result)

    // if (result.statusCode === 401) {
    //   return NextResponse.rewrite(new URL("/auth/login", request.url));
    // }


    // # ADMIN
    if (
      request.nextUrl.pathname.includes("/dashboard/agencies") &&
      request.nextUrl.pathname.includes("/dashboard/categories") &&
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

      authorized: async ({ token, req }) => {
        const user = token;



        return !!user?.token

      },
    },
  }
);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
