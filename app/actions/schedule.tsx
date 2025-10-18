"use client";

import { prisma as Prisma } from "@/lib/prisma";
import { Patient } from "@prisma/client";
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
