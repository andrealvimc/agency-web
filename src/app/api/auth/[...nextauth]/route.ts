import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        try {
          // @ts-ignore
          const res = await fetch(
            process.env.SERVER_URL + "/auth/login" ||
              "https://api.agenciaescalavel.com.br/auth/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            }
          );
          const data = await res.json();

          if (res.status !== 200) {
            throw new Error("Invalid login");
          }

          if (data.token) {
            return data;
          }
        } catch (error) {
          throw new Error("Invalid login");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role as any;
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;

      if (session?.user) {
        session.user.agencyId = session.user.agencyId;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
