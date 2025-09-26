"use server";
import { Note } from "@/types/note";
import { prisma as Prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

//REMOVE NOTE

export const removeNote = async (noteId: string) => {
  try {
    if (!noteId) {
      return { error: "Invalid note ID" };
    }
    await Prisma.note.delete({
      where: { id: noteId },
    });

    revalidatePath("/dashboard/appointments");

    return { success: true };
  } catch (error) {
    return { error };
  }
};

//CHANGE FLAG STATE

export const changeNoteFlagState = async (
  noteId: string,
  newFlagState: boolean
) => {
  try {
    if (!noteId) {
      return { error: "Invalid note ID" };
    }

    await Prisma.note.update({
      where: { id: noteId },
      data: { isFlagged: newFlagState },
    });

    revalidatePath("/dashboard/appointments");
    return { success: true };
  } catch (error) {
    return { error };
  }
};

//CREATE NOTE

export const createNote = async (noteData: {
  content: string;
  appointmentId: string;
}) => {
  try {
    if (!noteData.content || !noteData.appointmentId) {
      return { error: "Please enter valid data" };
    }

    await Prisma.note.create({
      data: noteData,
    });

    revalidatePath("/dashboard/appointments");
    return { success: true };
  } catch (error) {
    return { error };
  }
};

//GET NOTES

export const getNotes = async (appointmentId: string) => {
  try {
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
  } catch (error) {
    return { error };
  }
};
