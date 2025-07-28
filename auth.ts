import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: {},
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const user = {
          id: "1",
          username: "Kevin",
          email: "kev@gmail.com",
          password: "kevin",
        };

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        if (
          credentials.email === user.email &&
          credentials.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
});
