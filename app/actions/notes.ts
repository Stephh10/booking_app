"use server";
import { Note } from "@/types/note";
import { prisma as Prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

//CREATE NOTE

export const createNote = async (noteData: Note) => {
  console.log(noteData);

  if (!noteData.content || !noteData.appointmentId) {
    return { error: "Please enter valid data" };
  }

  await Prisma.note.create({
    data: noteData,
  });

  revalidatePath("/dashboard/appointments");
  return { success: true };
};

//GET NOTES

export const getNotes = async (appointmentId: string) => {
  if (!appointmentId) {
    return { error: "Invalid appointment ID" };
  }

  await Prisma.note.findMany({
    where: {
      appointmentId: appointmentId,
    },
    orderBy: [{ isFlagged: "desc" }, { createdAt: "desc" }],
  });
};
