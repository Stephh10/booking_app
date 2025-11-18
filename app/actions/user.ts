"use server";

import { auth } from "@/auth";
import { prisma as Prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { User } from "@prisma/client";

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
