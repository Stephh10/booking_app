import { create } from "zustand";

interface PatientData {
  firstName: string;
  lastName: string;
  email: string | null;
  phone?: string | null;
  dateOfBirth?: Date | null;
  gender?: string | null;
  city?: string | null;
  postalCode?: string | null;
}

export const useAddPatient = create<{
  patientData: PatientData | null;
  savePatientData: (data: PatientData) => void;
  clearPatientData: () => void;
}>((set) => ({
  patientData: null,
  savePatientData: (data: PatientData) => set({ patientData: data }),
  clearPatientData: () => set({ patientData: null }),
}));
