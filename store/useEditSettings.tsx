import { create } from "zustand";

export const useEditSettings = create<{
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}>((set) => ({
  isEditing: false,
  setIsEditing: (value: boolean) => set({ isEditing: value }),
}));
