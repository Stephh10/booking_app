"use server";
import { auth } from "@/auth";
import { getDay } from "date-fns";
import { prisma as Prisma } from "@/lib/prisma";

interface FreeSlot {
  dayOfWeek: number;
  startTime: Date;
  endTime: Date;
}

export const getDoctorAvailability = async (selectedDate: Date) => {
  const authResult = await auth();
  const activeUser = authResult?.user;
  const dayOfWeek = getDay(selectedDate);

  // get available date
  const availability = await Prisma.doctorAvailability.findFirst({
    where: {
      doctorId: activeUser?.id,
      dayOfWeek,
    },
  });

  if (!availability) return [];

  // get appointments

  const startOfDay = new Date(selectedDate);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(selectedDate);
  endOfDay.setHours(23, 59, 59, 999);

  const appointments = await Prisma.appointment.findMany({
    where: {
      doctorId: activeUser?.id,
      date: { gte: startOfDay, lt: endOfDay },
      status: "scheduled",
    },
  });

  const bookedIntervals = appointments.map((a) => {
    const start = new Date(a.date);
    const end = new Date(a.date.getTime() + a.duration * 60000);
    return { start, end };
  });

  const workingDayStart = new Date(selectedDate);
  workingDayStart.setHours(
    availability.startTime.getHours(),
    availability.startTime.getMinutes(),
    0,
    0
  );

  const workingDayEnd = new Date(selectedDate);
  workingDayEnd.setHours(
    availability.endTime.getHours(),
    availability.endTime.getMinutes(),
    0,
    0
  );

  const SLOT_DURATION = 30;
  const freeSlots: FreeSlot[] = [];

  let slotTime = new Date(workingDayStart);

  while (slotTime < workingDayEnd) {
    const slotEnd = new Date(slotTime.getTime() + SLOT_DURATION * 60000);

    const slotStartTime = slotTime.getTime();
    const slotEndTime = slotEnd.getTime();

    const isFree = !bookedIntervals.some((b) => {
      const bookedStart = b.start.getTime();
      const bookedEnd = b.end.getTime();
      return slotStartTime < bookedEnd && slotEndTime > bookedStart;
    });

    if (isFree) {
      freeSlots.push({
        dayOfWeek,
        startTime: new Date(slotTime),
        endTime: slotEnd,
      });
    }

    slotTime = slotEnd;
  }

  return freeSlots;
};
