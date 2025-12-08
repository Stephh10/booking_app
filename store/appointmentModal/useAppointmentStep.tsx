import { create } from "zustand";

export const useAppointmentStep = create<{
  step: number;
  isEditing: boolean;
  changeStep: (value: number) => void;
  resetStep: () => void;
}>((set) => ({
  step: 3,
  isEditing: true,
  patientData: null,
  changeStep: (step: number) => set({ step }),
  resetStep: () => set({ step: 1 }),
}));
