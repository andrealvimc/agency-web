import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: number;
      name: string;
      email: string;
      role: string;
      token: string;
      agencyId: string | null;
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: string;
  }
}
