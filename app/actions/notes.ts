"use server";
import { Note } from "@/types/note";
import { prisma as Prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

//CHANGE FLAG STATE

export const changeNoteFlagState = async (
  noteId: string,
  newFlagState: boolean
) => {
  if (!noteId) {
    return { error: "Invalid note ID" };
  }

  await Prisma.note.update({
    where: { id: noteId },
    data: { isFlagged: newFlagState },
  });

  revalidatePath("/dashboard/appointments");
  return { success: true };
};

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

  const notesData = await Prisma.note.findMany({
    where: {
      appointmentId: appointmentId,
    },
    orderBy: [{ isFlagged: "desc" }, { createdAt: "desc" }],
  });

  return notesData;
};
