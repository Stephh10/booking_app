"use server";

import { auth } from "@/auth";
import { prisma as Prisma } from "@/lib/prisma";

export const getAllPatients = async () => {
  const activeUser = await auth();
  if (!activeUser?.user) {
    throw new Error("Not Authorized");
  }

  const activeUserId = activeUser.user.id;

  const patients = await Prisma.patient.findMany({
    where: {
      doctorId: activeUserId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return patients;
};
