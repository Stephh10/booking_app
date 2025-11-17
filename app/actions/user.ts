"use server";

import { auth } from "@/auth";
import { prisma as Prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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
