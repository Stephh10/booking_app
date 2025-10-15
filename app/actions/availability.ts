"use server";
import { auth } from "@/auth";
import { getDay } from "date-fns";
import { ClockFading } from "lucide-react";
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

  const myData = { doctorId: activeUser?.id, dayOfWeek };

  // get available date
  const availability = await Prisma.doctorAvailability.findFirst({
    where: {
      doctorId: activeUser?.id,
      dayOfWeek,
    },
  });

  if (!availability) return [];

  // get appointments
  const appointments = await Prisma.appointment.findMany({
    where: {
      doctorId: activeUser?.id,
      date: {
        gte: new Date(selectedDate.setHours(0, 0, 0, 0)),
        lt: new Date(selectedDate.setHours(23, 59, 59, 999)),
      },
      status: "scheduled",
    },
  });

  const bookedIntervals = appointments.map((a) => {
    const start = new Date(a.date);
    const end = new Date(a.date.getTime() + a.duration * 60000);
    return { start, end };
  });

  const SLOT_DURATION = 30;

  // get free slots
  const freeSlots: FreeSlot[] = [];
  let slotTime = new Date(availability.startTime);

  while (slotTime < availability.endTime) {
    const slotEnd = new Date(slotTime.getTime() + SLOT_DURATION * 60000);

    //check appointments
    const isFree = !bookedIntervals.some(
      (b) =>
        (slotTime >= b.start && slotTime < b.end) ||
        (slotEnd > b.start && slotEnd <= b.end) ||
        (slotTime <= b.start && slotEnd >= b.end) //
    );

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
