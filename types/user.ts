import { Appointment } from "./appointment";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "DOCTOR" | string;
  createdAt: Date;
  updatedAt: Date;
  appointments?: Appointment[];
}
