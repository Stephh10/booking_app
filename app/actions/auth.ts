"use server";
import { signIn, signOut } from "@/auth";
import bcrypt from "bcryptjs";
import { prisma as Prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

type LoginState = {
  error?: any;
  success?: boolean;
};

export async function loginAction(formData: {
  email: string;
  password: string;
}): Promise<LoginState> {
  const { email, password } = formData;

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

export async function registerAction(formData: any) {
  const { firstName, lastName, email, password } = formData;

  if (
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    !firstName ||
    !lastName ||
    !email ||
    !password
  ) {
    return { error: "Please provide valid email and password" };
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

  await signIn("credentials", { email, password, redirect: false });

  redirect("/dashboard");
}
