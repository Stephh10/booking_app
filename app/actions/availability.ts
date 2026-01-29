"use server";
import { auth } from "@/auth";
import { getDay } from "date-fns";
import { prisma as Prisma } from "@/lib/prisma";
import { DoctorAvailability } from "@prisma/client";
import { parseToIsoTime } from "@/lib/dateFormats/parseToIsoTime";
import { revalidatePath } from "next/cache";

interface FreeSlot {
  dayOfWeek: number;
  startTime: Date;
  endTime: Date;
}

//UPDATE BREAK TIME

export const updateBreakTime = async (startTime: string, endTime: string) => {
  const authResult = await auth();
  const activeUser = authResult?.user;

  if (!activeUser) {
    return { error: "You are not authenticated" };
  }

  await Prisma.doctorAvailability.updateMany({
    where: {
      doctorId: activeUser.id,
    },
    data: {
      breakTimeStart: parseToIsoTime(startTime),
      breakTimeEnd: parseToIsoTime(endTime),
    },
  });

  return { success: "Updated work schedule successfully" };
};

// //CREATE BREAK TIME

export const handleCreateBreakTime = async (status: boolean) => {
  const authResult = await auth();
  const activeUser = authResult?.user;

  if (!activeUser) {
    return { error: "You are not authenticated" };
  }

  if (!status) {
    const updateData = await Prisma.doctorAvailability.updateMany({
      where: {
        doctorId: activeUser.id,
      },
      data: {
        breakTimeStart: null,
        breakTimeEnd: null,
      },
    });

    if (!updateData) {
      return { error: "Select a day to create a break" };
    }
  }

  return { success: "Updated work schedule successfully" };
};

//UPDATE DAY TIME

export const updateDayTime = async (
  selectedDay: number,
  startTime?: string | Date,
  endTime?: string | Date,
) => {
  const authResult = await auth();
  const activeUser = authResult?.user;

  if (!activeUser) {
    return { error: "You are not authenticated" };
  }

  const record = await Prisma.doctorAvailability.findFirst({
    where: {
      doctorId: activeUser.id,
      dayOfWeek: selectedDay,
    },
  });

  if (!record) {
    return { error: "No availability found for this day" };
  }

  if (!startTime || !endTime) {
    return { error: "Start and end time are required" };
  }

  const updated = await Prisma.doctorAvailability.update({
    where: { id: record.id },
    data: {
      startTime:
        startTime instanceof Date ? startTime : parseToIsoTime(startTime),
      endTime: endTime instanceof Date ? endTime : parseToIsoTime(endTime),
    },
  });

  return { success: "Updated work schedule successfully", updated };
};

//UPDATE ACTIVE DAYS

export const updateActiveDays = async (selectedDay: number) => {
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
    //finds break time
    const findBreakTime = await Prisma.doctorAvailability.findFirst({
      where: {
        doctorId: activeUser.id,
        breakTimeStart: {
          not: null,
        },
      },
    });

    //creates new day
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
        breakTimeStart: findBreakTime?.breakTimeStart || null,
        breakTimeEnd: findBreakTime?.breakTimeEnd || null,
      },
    });
  }

  revalidatePath("/dashboard/availability");

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

  const availability = await Prisma.doctorAvailability.findFirst({
    where: {
      doctorId: activeUser?.id,
      dayOfWeek,
    },
  });

  if (!availability) return [];

  // appointments that day
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

  // format available time that day
  const startHours = availability.startTime.getUTCHours();
  const startMinutes = availability.startTime.getUTCMinutes();
  const endHours = availability.endTime.getUTCHours();
  const endMinutes = availability.endTime.getUTCMinutes();

  const workingDayStart = new Date(selectedDate);
  workingDayStart.setHours(startHours, startMinutes, 0, 0);

  const workingDayEnd = new Date(selectedDate);
  workingDayEnd.setHours(endHours, endMinutes, 0, 0);

  // handle optional break time
  let breakStart: Date | null = null;
  let breakEnd: Date | null = null;

  if (availability.breakTimeStart && availability.breakTimeEnd) {
    breakStart = new Date(selectedDate);
    breakStart.setHours(
      availability.breakTimeStart.getUTCHours(),
      availability.breakTimeStart.getUTCMinutes(),
      0,
      0,
    );

    breakEnd = new Date(selectedDate);
    breakEnd.setHours(
      availability.breakTimeEnd.getUTCHours(),
      availability.breakTimeEnd.getUTCMinutes(),
      0,
      0,
    );
  }

  const SLOT_DURATION = 30;
  const freeSlots: FreeSlot[] = [];

  let slotTime = new Date(workingDayStart);

  while (slotTime < workingDayEnd) {
    const slotEnd = new Date(slotTime.getTime() + SLOT_DURATION * 60000);

    const overlapsWithAppointment = bookedIntervals.some((b) => {
      return slotTime < b.end && slotEnd > b.start;
    });

    const overlapsWithBreak =
      breakStart && breakEnd
        ? slotTime < breakEnd && slotEnd > breakStart
        : false;

    if (!overlapsWithAppointment && !overlapsWithBreak) {
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

export const getDemoAvailability = async (
  selectedDate: Date,
): Promise<FreeSlot[]> => {
  const dayOfWeek = selectedDate.getDay();

  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return [];
  }

  const WORK_START_HOUR = 9;
  const WORK_END_HOUR = 17;

  const BREAK_START_HOUR = 12;
  const BREAK_END_HOUR = 13;

  const SLOT_DURATION = 30;

  const workingDayStart = new Date(selectedDate);
  workingDayStart.setHours(WORK_START_HOUR, 0, 0, 0);

  const workingDayEnd = new Date(selectedDate);
  workingDayEnd.setHours(WORK_END_HOUR, 0, 0, 0);

  const breakStart = new Date(selectedDate);
  breakStart.setHours(BREAK_START_HOUR, 0, 0, 0);

  const breakEnd = new Date(selectedDate);
  breakEnd.setHours(BREAK_END_HOUR, 0, 0, 0);

  const freeSlots: FreeSlot[] = [];

  let slotTime = new Date(workingDayStart);

  while (slotTime < workingDayEnd) {
    const slotEnd = new Date(slotTime.getTime() + SLOT_DURATION * 60000);

    const overlapsWithBreak = slotTime < breakEnd && slotEnd > breakStart;

    if (!overlapsWithBreak) {
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
