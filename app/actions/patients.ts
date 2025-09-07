"use server";

import { auth } from "@/auth";
import { prisma as Prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Patient } from "@/types/patient";

//CREATE PATIENT

export const createPatient = async (data: Patient) => {
  const authResult = await auth();
  const activeUser = authResult?.user;

  if (!activeUser) {
    return { error: "Please Login to continue this operation" };
  }

  let patient = null;

  if (data.email) {
    patient = await Prisma.patient.findFirst({
      where: {
        email: data.email,
        doctorId: activeUser.id,
      },
    });
  }

  if (!patient && data.phone) {
    patient = await Prisma.patient.findFirst({
      where: {
        phone: data.phone,
        doctorId: activeUser.id,
      },
    });
  }

  if (!patient && data.firstName && data.lastName) {
    patient = await Prisma.patient.findFirst({
      where: {
        firstName: data.firstName,
        lastName: data.lastName,
        doctorId: activeUser.id,
      },
    });
  }

  if (!patient) {
    patient = await Prisma.patient.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email || null,
        phone: data.phone || null,
        doctorId: activeUser.id,
      },
    });
  }

  revalidatePath("/dashboard/patients");
  return patient;
};

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
