"use server";
import { signIn } from "@/auth";
import bcrypt from "bcryptjs";
import { prisma as Prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

type LoginState = {
  error?: any;
  success?: boolean;
};

export async function loginAction(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email");
  const password = formData.get("password");

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    !email ||
    !password
  ) {
    return { error: "Please provide valid email and password" };
  }

  const user = await Prisma.user.findUnique({
    where: { email: email },
  });

  if (!user || !user.password) {
    return { error: "User not found" };
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return { error: "Invalid password" };
  }

  await signIn("credentials", { email, password, redirect: false });

  redirect("/");

  return { success: true };
}

export async function registerAction(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email");
  const password = formData.get("password");
  const username = formData.get("username");

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    !email ||
    !password
  ) {
    return { error: "Please provide valid email and password" };
  }

  const user = await Prisma.user.findUnique({
    where: { email: email },
  });

  if (user) {
    return { error: "User already exists" };
  }

  const newUser = await Prisma.user.create({
    data: {
      username: username as string,
      email,
      password: await bcrypt.hash(password, 10),
    },
  });

  await signIn("credentials", { email, password, redirect: false });

  redirect("/");

  return { success: true };
}
