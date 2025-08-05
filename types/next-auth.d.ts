import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName?: string;
      lastName?: string;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    firstName?: string;
    lastName?: string;
    email?: string | null;
    image?: string | null;
  }
}
