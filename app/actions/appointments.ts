"use server";
import { prisma as Prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { Patient } from "@/types/patient";
import { Appointment } from "@/types/appointment";

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

  if (!data.doctorId || !data.date) {
    throw new Error("Doctor ID and date are required to create an appointment");
  }

  if (!activeUser || !activeUser.id) {
    return { error: "Doctor ID is required" };
  }

  let existingPatient = null;

  if (data.patientEmail) {
    existingPatient = await Prisma.patient.findFirst({
      where: {
        email: data.patientEmail,
        doctorId: activeUser.id,
      },
    });
  }

  if (!existingPatient && data.patientPhone) {
    existingPatient = await Prisma.patient.findFirst({
      where: {
        phone: data.patientPhone,
        doctorId: activeUser.id,
      },
    });
  }

  if (!existingPatient && data.firstName && data.lastName) {
    existingPatient = await Prisma.patient.findFirst({
      where: {
        firstName: data.firstName,
        lastName: data.lastName,
        doctorId: activeUser.id,
      },
    });
  }

  if (!existingPatient) {
    existingPatient = await Prisma.patient.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.patientEmail || null,
        phone: data.phone || null,
        doctorId: activeUser.id,
      },
    });
  }

  const appointment = await Prisma.appointment.create({
    data: {
      reason: data.reason,
      duration: data.duration,
      date: data.date,
      diagnose: data.diagnose || null,
      patientId: existingPatient.id,
      doctorId: activeUser.id,
    },
  });

  if (!appointment) {
    throw new Error("Failed to create appointment");
  }

  revalidatePath("/dashboard");
}
