import { Appointment } from "./appointment";
import { Prisma } from "@prisma/client";

export type UserSettingsDTO = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: number | null;

  country?: string | null;
  city?: string | null;
  address?: string | null;
  postalCode?: number | null;

  profileImage?: {
    url: string;
  } | null;
};

export type AppointmentWithPatient = Prisma.AppointmentGetPayload<{
  include: {
    patient: true;
  };
}>;
