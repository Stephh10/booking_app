import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma as Prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      //@ts-ignore
      async authorize(credentials: any) {
        const user = await Prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!user || !user.password) return null;

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isValidPassword) return null;

        return {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          region: user.region,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      //after login
      if (user) {
        token.user = user;
      }

      //update logic
      if (trigger === "update" && session?.region) {
        if (token.user) {
          (token.user as { region?: string }).region = session.region;
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
});
