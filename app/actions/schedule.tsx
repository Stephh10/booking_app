"use server";

import { prisma as Prisma } from "@/lib/prisma";
import { createAppointment } from "./appointments";

export const handleScheduleSubmit = async (data: any, doctorId: string) => {
  try {
    const appointment = await createAppointment(data, doctorId, true);

    return appointment;
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const getScheduleData = async (appointmentId: string) => {
  if (!appointmentId) {
    return { error: "Invalid appointment ID" };
  }

  const appointment = await Prisma.appointment.findFirst({
    where: {
      id: appointmentId,
    },
  });

  if (appointment && !appointment.id) {
    return { error: "Something went wrong" };
  }

  const doctorInfo = await Prisma.user.findFirst({
    where: {
      id: appointment?.doctorId,
    },
  });

  return { ...appointment, doctorInfo };
};
