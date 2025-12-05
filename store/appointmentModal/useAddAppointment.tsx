import { create } from "zustand";
import { Appointment } from "@prisma/client";

export const useAddAppointment = create<{
  appointmentData: Appointment | null;
  saveAppointmentData: (data: Appointment) => void;
  clearAppointmentData: () => void;
}>((set) => ({
  appointmentData: null,
  saveAppointmentData: (data: Appointment) => set({ appointmentData: data }),
  clearAppointmentData: () => set({ appointmentData: null }),
}));
