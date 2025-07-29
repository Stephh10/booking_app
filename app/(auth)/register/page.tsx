import React from "react";
import Link from "next/link";
import { prisma as Prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export default function page() {
  async function handleRegister(formData: FormData) {
    "use server";
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    if (
      typeof username !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      throw new Error("All fields are required");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await Prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    if (!user) {
      throw new Error("User registration failed");
    }

    await signIn("credentials", { username, email, password });
    redirect("/");
  }
  return (
    <div className="min-h-[calc(100vh-60px)] w-full flex items-center justify-center">
      <div className="w-[400px] border border-amber-50 text-center p-2 rounded">
        <h2 className="text-lg font-bold mb-2">Register</h2>
        <form className="authForm flex flex-col" action={handleRegister}>
          <input
            className="form-input"
            name="username"
            type="text"
            placeholder="Username"
          />
          <input
            className="form-input"
            name="email"
            type="text"
            placeholder="Email"
          />
          <input
            className="form-input"
            name="password"
            type="text"
            placeholder="Password"
          />
          <button className="formBtn bg-[var(--btn-primary)]">Register</button>
        </form>
        <p className="pt-2 text-gray-400">
          Already have an account?
          <Link className="ml-2" href={"/login"}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
