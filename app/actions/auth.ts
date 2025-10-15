"use server";
import { signIn, signOut } from "@/auth";
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

  redirect("/dashboard");

  return { success: true };
}

export async function registerAction(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email");
  const password = formData.get("password");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    !email ||
    !password ||
    !firstName ||
    !lastName
  ) {
    return { error: "Please provide all required fields." };
  }

  //EXISTING USER
  const existingUser = await Prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "User already exists." };
  }

  //CREATE NEW USER
  const newUser = await Prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: await bcrypt.hash(password, 10),
    },
  });

  //CREATE AVAILABILITY TABLE

  const availabilityData = Array.from({ length: 5 }, (_, i) => ({
    doctorId: newUser.id,
    dayOfWeek: i + 1,
    startTime: new Date("1970-01-01T08:00:00Z"),
    endTime: new Date("1970-01-01T16:00:00Z"),
  }));

  await Prisma.doctorAvailability.createMany({
    data: availabilityData,
  });

  // 🔹 Automatski login
  await signIn("credentials", { email, password, redirect: false });

  redirect("/");

  return { success: true };
}
