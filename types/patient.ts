import { Appointment } from "./appointment";

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email?: string | null;
  phone?: string | null;
  doctorId: string;
  createdAt: Date;
  updatedAt: Date;
  appointments?: Appointment[];
  gender?: string;
  dateOfBirth?: Date | string;
  nationalId?: string;
  city?: string;
  postalCode?: string;
}
