import { create } from "zustand";

export const useAddAppointment = create<{
  step: number;
  changeStep: (value: number) => void;
  resetStep: () => void;
}>((set) => ({
  step: 1,
  patientData: null,
  changeStep: (step: number) => set({ step }),
  resetStep: () => set({ step: 1 }),
}));
