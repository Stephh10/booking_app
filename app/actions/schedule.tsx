"use client";

import { prisma as Prisma } from "@/lib/prisma";

type ScheduleData = {
  date: Date;
  time: Number;
  email: string;
  phone: number;
  firstName: string;
  lastName: string;
  message: string;
};

export const handleScheduleSubmit = (data: ScheduleData) => {
  console.log("All good");
  return { success: "Route hittt" };
};
