"use server";
import { auth } from "@/auth";
import { getDay } from "date-fns";
import { prisma as Prisma } from "@/lib/prisma";
import { DoctorAvailability } from "@prisma/client";
import { parseToIsoTime } from "@/lib/dateFormats/parseToIsoTime";

interface FreeSlot {
  dayOfWeek: number;
  startTime: Date;
  endTime: Date;
}

//UPDATE DAY TIME

export const updateDayTime = async (
  selectedDay: number,
  startTime: string,
  endTime: string
) => {
  const authResult = await auth();
  const activeUser = authResult?.user;

  const formatedDates = {
    startTime: parseToIsoTime(startTime),
    endTime: parseToIsoTime(endTime),
  };

  console.log(formatedDates);

  console.log(startTime, endTime);

  if (!activeUser) {
    return { error: "You are not authenticated" };
  }

  // Pronađi zapis koji treba da update-uješ
  const record = await Prisma.doctorAvailability.findFirst({
    where: {
      doctorId: activeUser.id,
      dayOfWeek: selectedDay,
    },
  });

  if (!record) {
    return { error: "No availability found for this day" };
  }

  // Update po id-u
  const updated = await Prisma.doctorAvailability.update({
    where: { id: record.id },
    data: {
      startTime: parseToIsoTime(startTime),
      endTime: parseToIsoTime(endTime),
    },
  });

  return { success: "Updated work schedule successfully", updated };
};

//UPDATE ACTIVE DAYS

export const updateActiveDays = async (selectedDay: number) => {
  console.log(selectedDay);

  const authResult = await auth();
  const activeUser = authResult?.user;

  if (!activeUser) {
    return { error: "You are not authentificated" };
  }

  const dayData = await Prisma.doctorAvailability.findFirst({
    where: {
      doctorId: activeUser.id,
      dayOfWeek: selectedDay,
    },
  });

  if (dayData) {
    await Prisma.doctorAvailability.delete({
      where: {
        id: dayData.id,
      },
    });
  } else {
    const startTime = new Date();
    startTime.setHours(9, 0, 0, 0);

    const endTime = new Date();
    endTime.setHours(17, 0, 0, 0);

    await Prisma.doctorAvailability.create({
      data: {
        doctorId: activeUser.id,
        dayOfWeek: selectedDay,
        startTime,
        endTime,
      },
    });
  }

  return { success: "Updated work schedule successfully" };
};

//GET ACTIVE DATES

export const getAvailableDays = async (): Promise<
  DoctorAvailability[] | { error: string }
> => {
  const authResult = await auth();
  const activeUser = authResult?.user;

  if (!activeUser) {
    return { error: "You are not authentificated" };
  }

  const availabeDays = await Prisma.doctorAvailability.findMany({
    where: {
      doctorId: activeUser.id,
    },
  });

  return availabeDays;
};

//GET DOCTOR AVAILABILITY - FOR PATIENTS

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
