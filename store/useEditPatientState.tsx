import { create } from "zustand";

export const useEditPatientState = create<{
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}>((set) => ({
  isEditing: false,
  setIsEditing: (value: boolean) => set({ isEditing: value }),
}));
