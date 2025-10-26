"use server";
import { prisma as Prisma } from "./prisma";

export const syncAppointmentsStatus = async () => {
  await Prisma.appointment.updateMany({
    where: {
      status: "scheduled",
      date: { lt: new Date() },
    },
    data: {
      status: "completed",
    },
  });
};
