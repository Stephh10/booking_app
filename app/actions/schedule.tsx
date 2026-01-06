"use server";

import { prisma as Prisma } from "@/lib/prisma";
import { createAppointment } from "./appointments";

type ScheduleData = {
  date: Date;
  time: Number;
  email: string;
  phone: number;
  firstName: string;
  lastName: string;
  message: string;
};

export const handleScheduleSubmit = async (data: any, doctorId: string) => {
  const appointment = await createAppointment(data, doctorId);

  return appointment;
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
