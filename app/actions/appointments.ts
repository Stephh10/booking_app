"use server";
import { prisma as Prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { Patient } from "@prisma/client";
import { Appointment } from "@prisma/client";
import { UpdatedAppointment } from "@/types/appointment";

// GET PAST APPOINTMENTS

export const getPastAppointments = async (): Promise<
  Appointment[] | { error: string }
> => {
  const authResult = await auth();
  const activeUser = authResult?.user;

  if (!activeUser) {
    return { error: "Please Login to continue this operation" };
  }

  const now = new Date();

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const todaysAppointments = await Prisma.appointment.findMany({
    where: {
      doctorId: activeUser.id,
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  const pastAppointments = todaysAppointments.filter((appointment) => {
    const endTime = new Date(
      new Date(appointment.date).getTime() + appointment.duration * 60 * 1000
    );
    return endTime < now;
  });

  return pastAppointments;
};

//GET NEXT APPOINTMENT

export const getNextAppointment = async (): Promise<
  { patient: Patient; date: Date } | { error: string }
> => {
  const authResult = await auth();
  const activeUser = authResult?.user;

  if (!activeUser) {
    return { error: "Please Login to continue this operation" };
  }

  const now = new Date();

  const nextAppointment = await Prisma.appointment.findFirst({
    where: {
      doctorId: activeUser.id,
      date: {
        gt: now,
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  if (!nextAppointment || !nextAppointment.patientId) {
    return {
      error: !nextAppointment
        ? "No upcoming appointments found"
        : "Patient not found",
    };
  }

  const patient = await Prisma.patient.findUnique({
    where: {
      id: nextAppointment.patientId,
    },
  });

  if (!patient) {
    return { error: "Patient not found" };
  }

  return { patient, date: nextAppointment.date };
};

//GET TODAY'S APPOINTMENTS

export const getTodaysAppointments = async (): Promise<
  Appointment[] | { error: string }
> => {
  const authResult = await auth();
  const activeUser = authResult?.user;

  if (!activeUser) {
    return { error: "Please Login to continue this operation" };
  }

  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  const appointments = await Prisma.appointment.findMany({
    where: {
      doctorId: activeUser.id,
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });

  return appointments;
};

//DELETE SELECTED APPOINTMENTS

export const removeSelectedAppointments = async (appIds: string[]) => {
  if (!appIds.length) return { error: "No appointments selected" };

  try {
    await Prisma.appointment.deleteMany({
      where: {
        id: { in: appIds },
      },
    });

    revalidatePath("/dashboard/appointments");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete appointments" };
  }
};

//DELETE APPOINTMENT

export const deleteAppointment = async (appId: string) => {
  try {
    if (!appId) {
      return { error: "Appointment id is required" };
    }

    await Prisma.appointment.delete({
      where: { id: appId },
    });

    revalidatePath("/dashboard/appointments");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete appointment" };
  }
};

//GET ALL APPOINTMENTS FROM PATIENT ID

export const getPatientAppointments = async (patientId: string) => {
  try {
    if (!patientId) {
      return { error: "Patient Id is required" };
    }

    const patientApp = await Prisma.appointment.findMany({
      where: {
        patientId: patientId,
      },
    });

    if (!patientApp) {
      return { error: "No appointments found" };
    }

    console.log(patientApp);

    return patientApp;
  } catch (error) {
    return { error: "Failed to fetch appointments" };
  }
};

//UPDATE SELECTED APPOINTMENT

export const updateSelectedAppointment = async (
  appId: string,
  updatedData: UpdatedAppointment
) => {
  try {
    if (!appId) {
      return { error: "Appointment id is required" };
    }

    const appointment = await Prisma.appointment.update({
      where: { id: appId },
      data: updatedData,
    });

    revalidatePath(`/dashboard/appointments/${appId}`);
    return appointment;
  } catch (error) {
    return { error: "Failed to update appointment", details: error };
  }
};

//GET SELECTED APPOINTMENT

export const getSelectedAppointment = async (
  appId: string
): Promise<Appointment | { error: string }> => {
  if (!appId) {
    return { error: "Appointment id is required" };
  }

  const appointment = await Prisma.appointment.findFirst({
    where: { id: appId },
  });

  if (!appointment) {
    return { error: "Appointment data not found" };
  }

  return appointment as unknown as Appointment;
};

//GET PATIENT FROM APPOINTMENT ID

export const getAppPatient = async (
  appId: string
): Promise<Patient | { error: string }> => {
  if (!appId) {
    return { error: "Appointment id is required" };
  }

  const appointment = await Prisma.appointment.findFirst({
    where: {
      id: appId,
    },
  });

  if (!appointment || !appointment.patientId) {
    return { error: "Appointment is requiredd" };
  }

  const patientData = await Prisma.patient.findFirst({
    where: {
      id: appointment.patientId,
    },
  });

  if (!patientData) {
    return { error: "Something went wrong" };
  }

  return patientData;
};

//GET ALL APPOINTMENTS
export const getAllAppointments = async () => {
  const authResult = await auth();
  const activeUser = authResult?.user;

  if (!activeUser) {
    return { error: "You are not authentificated" };
  }

  const appointments = await Prisma.appointment.findMany({
    where: {
      doctorId: activeUser.id,
    },
  });

  if (!appointments) {
    return { error: "There is no appointments recorded" };
  }

  return appointments;
};

//CREATE APPOINTMENT
export async function createAppointment(data: any, doctorId?: string) {
  try {
    const authResult = await auth();
    let activeUser = undefined;

    if (!doctorId) {
      activeUser = authResult?.user;
    } else {
      activeUser = {
        id: doctorId,
      };
    }

    if (!activeUser?.id) {
      return { error: "You are not authentificated" };
    }

    console.log(activeUser, data.date);

    const existingPatient =
      (await Prisma.patient.findFirst({
        where: {
          OR: [
            { email: data.patientEmail },
            { phone: data.patientPhone },
            {
              firstName: data.firstName,
              lastName: data.lastName,
            },
          ],
          doctorId: activeUser.id,
        },
      })) ??
      (await Prisma.patient.create({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.patientEmail || null,
          phone: data.patientPhone || null,
          doctorId: activeUser.id,
        },
      }));

    const appointment = await Prisma.$transaction(async (tx) => {
      const createdAppointment = await tx.appointment.create({
        data: {
          reason: data.reason,
          duration: data.duration,
          date: data.date,
          diagnose: data.diagnose || null,
          patientId: existingPatient.id,
          doctorId: activeUser.id,
        },
      });

      const existingMedical = await tx.medicalDetails.findUnique({
        where: { patientId: existingPatient.id },
      });

      if (!existingMedical) {
        await tx.medicalDetails.create({
          data: { patientId: existingPatient.id },
        });
      }

      revalidatePath("/dashboard");
      return createdAppointment;
    });
    return appointment;
    revalidatePath("/dashboard");
  } catch (error) {
    return { error: "Something is wrong" };
  }
}
