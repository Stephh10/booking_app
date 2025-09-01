"use server";

import { auth } from "@/auth";
import { prisma as Prisma } from "@/lib/prisma";

//REMOVE PATIENTS

export const removePatients = (ids: string[]) => {
  try {
    if (!ids.length) {
      return;
    }
    const deletedPatients = Prisma.patient.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    return deletedPatients;
  } catch (error) {
    return { error: "Something went wrong", errDetails: error };
  }
};

//GET ALL PATIENTS

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
