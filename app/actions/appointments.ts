"use server";
import { prisma as Prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

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
        phone: data.patientPhone || null,
        doctorId: activeUser.id,
      },
    });
  }

  const appointment = await Prisma.appointment.create({
    data: {
      ...data,
      patientId: existingPatient,
    },
  });

  if (!appointment) {
    throw new Error("Failed to create appointment");
  }
}
