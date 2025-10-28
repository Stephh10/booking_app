import { create } from "zustand";

export const useEditAppountmentState = create<{
  isEditingAppointment: boolean;
  setIsEditingAppointment: (value: boolean) => void;
}>((set) => ({
  isEditingAppointment: false,
  setIsEditingAppointment: (value: boolean) =>
    set({ isEditingAppointment: value }),
}));
