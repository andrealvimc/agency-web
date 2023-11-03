import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  token: string;
  agencyId?: string | null;
  agencyRole?: string | null;
  accountId?: string;
};

declare module "next-auth" {
  interface Session {
    user?: {
      id: number;
      name: string;
      email: string;
      role: string;
      token: string;
      agencyId: string | null;
      agencyRole: string | null;
      accountId?: string;
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
