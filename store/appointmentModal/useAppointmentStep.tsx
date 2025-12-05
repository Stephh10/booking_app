import { create } from "zustand";

export const useAppointmentStep = create<{
  step: number;
  changeStep: (value: number) => void;
  resetStep: () => void;
}>((set) => ({
  step: 2,
  patientData: null,
  changeStep: (step: number) => set({ step }),
  resetStep: () => set({ step: 1 }),
}));
