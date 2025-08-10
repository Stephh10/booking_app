"use server";
import { prisma as Prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createAppointment(data: any) {
  if (!data.doctorId || !data.date) {
    throw new Error("Doctor ID and date are required to create an appointment");
  }

  const appointment = await Prisma.appointment.create({
    data: {
      ...data,
    },
  });

  if (!appointment) {
    throw new Error("Failed to create appointment");
  }
}
