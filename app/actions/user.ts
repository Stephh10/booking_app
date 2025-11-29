"use server";

import { auth } from "@/auth";
import { prisma as Prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";
//SENT FORGOT PASSWORD EMAIL

export const sendForgotPasswordEmail = async (email: string) => {
  const user = await Prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return { error: "User not found" };
  }

  const token = crypto.randomBytes(32).toString("hex");

  await Prisma.passwordResetToken.create({
    data: {
      token,
      userId: user.id,
      expiresAt: new Date(Date.now() + 1000 * 60 * 15),
    },
  });

  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Password Reset" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Reset your password",
    html: `
      <h2>Password Reset</h2>
      <p>Klikni na link ispod kako bi resetovao password:</p>
      <a href="${resetLink}" target="_blank">Reset Password</a>
      <p>Ovaj link važi 15 minuta.</p>
    `,
  });

  console.log(resetLink);

  return { success: true, message: "Reset email sent.", resetLink };
};

//DELETE ACCOUNT

export const deleteAccount = async () => {
  const authResult = await auth();
  const activeUser = authResult?.user;

  if (!activeUser) {
    return { error: "You are not authenticated" };
  }

  const userData = await Prisma.user.findUnique({
    where: {
      id: activeUser.id,
    },
  });

  if (!userData) {
    return { error: "User not found" };
  }

  await Prisma.user.delete({
    where: { id: userData.id },
  });

  return { success: true };
};

//CHANGE PASSWORD

export const changePassword = async (passwordDetails: any) => {
  const authResult = await auth();
  const activeUser = authResult?.user;

  if (!activeUser) {
    return { error: "You are not authenticated" };
  }

  if (
    !passwordDetails.currentPassword ||
    !passwordDetails.newPassword ||
    !passwordDetails.confirmPassword
  ) {
    return { error: "All fields are required" };
  }

  if (passwordDetails.newPassword !== passwordDetails.confirmPassword) {
    return { error: "Passwords do not match" };
  }

  const userData = await Prisma.user.findUnique({
    where: {
      id: activeUser.id,
    },
  });

  if (!userData) {
    return { error: "User not found" };
  }

  const comparePasswords = await bcrypt.compare(
    passwordDetails.currentPassword,
    userData.password
  );

  if (!comparePasswords) {
    return { error: "Current password is incorrect" };
  }

  const hashedPassword = await bcrypt.hash(passwordDetails.newPassword, 10);

  await Prisma.user.update({
    where: {
      id: activeUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  revalidatePath("/dashboard/settings");
  return { success: "Password changed successfully" };
};

//GET USER DATA

export const getUser = async (): Promise<User | { error: string }> => {
  const authResult = await auth();
  const activeUser = authResult?.user;

  if (!activeUser) {
    return { error: "You are not authenticated" };
  }

  const userData = await Prisma.user.findUnique({
    where: {
      id: activeUser.id,
    },
  });

  if (!userData) {
    return { error: "User not found" };
  }

  return userData;
};

//UPDATE USER
export const updateUser = async (data: any) => {
  const authResult = await auth();
  const activeUser = authResult?.user;

  if (!activeUser) {
    return { error: "You are not authenticated" };
  }

  const updatedUser = await Prisma.user.update({
    where: {
      id: activeUser.id,
    },
    data,
  });

  if (!updatedUser) {
    return { error: "Failed to update user" };
  }

  revalidatePath("/dashboard/settings");

  return { success: true };
};
