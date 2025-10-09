"use server";
import { prisma as Prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { Patient } from "@prisma/client";
import { Appointment } from "@/types/appointment";
import { UpdatedAppointment } from "@/types/appointment";

//DELETE APPOINTMENT

export const deleteAppointment = async (appId: string) => {
  try {
    if (!appId) {
      return { error: "Appointment id is required" };
    }

    await Prisma.appointment.delete({
      where: { id: appId },
    });

    revalidatePath("/dashboard/appointments");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete appointment" };
  }
};

//GET ALL APPOINTMENTS FROM PATIENT ID

export const getPatientAppointments = async (patientId: string) => {
  try {
    if (!patientId) {
      return { error: "Patient Id is required" };
    }

    const patientApp = await Prisma.appointment.findMany({
      where: {
        patientId: patientId,
      },
    });

    if (!patientApp) {
      return { error: "No appointments found" };
    }

    console.log(patientApp);

    return patientApp;
  } catch (error) {
    return { error: "Failed to fetch appointments" };
  }
};

//UPDATE SELECTED APPOINTMENT

export const updateSelectedAppointment = async (
  appId: string,
  updatedData: UpdatedAppointment
) => {
  try {
    if (!appId) {
      return { error: "Appointment id is required" };
    }

    const appointment = await Prisma.appointment.update({
      where: { id: appId },
      data: updatedData,
    });

    revalidatePath(`/dashboard/appointments/${appId}`);
    return appointment;
  } catch (error) {
    return { error: "Failed to update appointment", details: error };
  }
};

//GET SELECTED APPOINTMENT

export const getSelectedAppointment = async (
  appId: string
): Promise<Appointment | { error: string }> => {
  if (!appId) {
    return { error: "Appointment id is required" };
  }

  const appointment = await Prisma.appointment.findFirst({
    where: { id: appId },
  });

  if (!appointment) {
    return { error: "Appointment data not found" };
  }

  return appointment as unknown as Appointment;
};

//GET PATIENT FROM APPOINTMENT ID

export const getAppPatient = async (
  appId: string
): Promise<Patient | { error: string }> => {
  if (!appId) {
    return { error: "Appointment id is required" };
  }

  const appointment = await Prisma.appointment.findFirst({
    where: {
      id: appId,
    },
  });

  if (!appointment || !appointment.patientId) {
    return { error: "Appointment is requiredd" };
  }

  const patientData = await Prisma.patient.findFirst({
    where: {
      id: appointment.patientId,
    },
  });

  if (!patientData) {
    return { error: "Something went wrong" };
  }

  return patientData;
};

//GET ALL APPOINTMENTS
export const getAllAppointments = async () => {
  const authResult = await auth();
  const activeUser = authResult?.user;

  if (!activeUser) {
    return { error: "You are not authentificated" };
  }

  const appointments = await Prisma.appointment.findMany({
    where: {
      doctorId: activeUser.id,
    },
  });

  if (!appointments) {
    return { error: "There is no appointments recorded" };
  }

  return appointments;
};

//CREATE APPOINTMENT
export async function createAppointment(data: any) {
  const authResult = await auth();
  const activeUser = authResult?.user;

  if (!activeUser?.id) throw new Error("User not authenticated");
  if (!data.doctorId || !data.date)
    throw new Error("Doctor ID and date are required");

  const existingPatient =
    (await Prisma.patient.findFirst({
      where: {
        OR: [
          { email: data.patientEmail },
          { phone: data.patientPhone },
          {
            firstName: data.firstName,
            lastName: data.lastName,
          },
        ],
        doctorId: activeUser.id,
      },
    })) ??
    (await Prisma.patient.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.patientEmail || null,
        phone: data.patientPhone || null,
        doctorId: activeUser.id,
      },
    }));

  await Prisma.$transaction(async (tx) => {
    await tx.appointment.create({
      data: {
        reason: data.reason,
        duration: data.duration,
        date: data.date,
        diagnose: data.diagnose || null,
        patientId: existingPatient.id,
        doctorId: activeUser.id,
      },
    });

    const existingMedical = await tx.medicalDetails.findUnique({
      where: { patientId: existingPatient.id },
    });

    if (!existingMedical) {
      await tx.medicalDetails.create({
        data: { patientId: existingPatient.id },
      });
    }
  });

  revalidatePath("/dashboard");
}
