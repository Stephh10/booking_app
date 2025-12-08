import { create } from "zustand";
import { Patient } from "@prisma/client";

export const useAddPatient = create<{
  patientData: Patient | null;
  savePatientData: (data: Patient) => void;
  clearPatientData: () => void;
}>((set) => ({
  patientData: null,
  savePatientData: (data: Patient) => set({ patientData: data }),
  clearPatientData: () => set({ patientData: null }),
}));
