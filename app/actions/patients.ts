"use server";

import { auth } from "@/auth";
import { prisma as Prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Patient } from "@/types/patient";
import { PatientDataForm } from "@/types/patientDataForm";
import { MedicalDetails } from "@prisma/client";

//EDIT PATIENT MEDICAL DETAILS

export const editPatientMedicalDetails = async (
  medDataId: string,
  medData: MedicalDetails
) => {
  try {
    if (!medDataId) {
      return { error: "Medical data Id is required" };
    }
    const formattedData = {
      ...medData,
      height: Number(medData.height),
      weight: Number(medData.weight),
      heartRate: Number(medData.heartRate),
    };

    const updatedUser = await Prisma.medicalDetails.update({
      where: { id: medDataId },
      data: formattedData,
    });

    if (!updatedUser) {
      return { error: "Failed to update patient medical details" };
    }

    revalidatePath(`/dashboard/patient/${updatedUser.patientId}`);

    return { success: true };
  } catch (error) {
    return { error: "Failed to update User" };
  }
};

//GET PATIENT MEDICAL DETAILS

export const getPatientMedicalDetails = async (patientId: string) => {
  try {
    if (!patientId) {
      return { error: "Patient Id is required" };
    }

    const patient = await Prisma.medicalDetails.findUnique({
      where: {
        patientId: patientId,
      },
    });

    if (!patient) {
      return { error: "Patient not found" };
    }

    return patient;
  } catch (error) {
    return { error: "Failed to fetch a patient" };
  }
};

//UPDATE SELECTED PATIENT

export const updateSelectedPatient = async (patientData: PatientDataForm) => {
  try {
    await Prisma.patient.update({
      where: {
        id: patientData.id,
      },
      data: patientData,
    });
    revalidatePath(`/dashboard/patient/${patientData.id}`);
    return { success: true };
  } catch (error) {
    return { error: "Failed to update patient" };
  }
};

//GET SELECTED PATIENT

export const getSelectedPatient = async (patientId: string) => {
  try {
    if (!patientId) {
      return { error: "Patient Id is required" };
    }

    const patient = await Prisma.patient.findUnique({
      where: {
        id: patientId,
      },
    });

    if (!patient) {
      return { error: "Patient not found" };
    }

    return patient;
  } catch (error) {
    return { error: "Failed to fetch a patient" };
  }
};

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

  const existingMedical = await Prisma.medicalDetails.findUnique({
    where: { patientId: patient.id },
  });

  if (!existingMedical) {
    await Prisma.medicalDetails.create({
      data: {
        patientId: patient.id,
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
