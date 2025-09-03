"use server";

import { auth } from "@/auth";
import { prisma as Prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

//REMOVE PATIENTS

export const removeSelectedPatients = async (ids: string[]) => {
  try {
    const deletedPatients = Prisma.patient.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    revalidatePath("/dashboard/patients");
    return deletedPatients;
  } catch (error) {
    return { error: "Something went wrong" };
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
