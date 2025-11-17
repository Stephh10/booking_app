import { create } from "zustand";

export const useEditSettings = create<{
  isEditing: boolean;
  submit: boolean;
  handleSubmit: () => void;
  setIsEditing: (value: boolean) => void;
}>((set) => ({
  isEditing: false,
  submit: false,

  handleSubmit: () => {
    set({ submit: true });
    setTimeout(() => set({ submit: false }), 0);
  },

  setIsEditing: (value: boolean) => set({ isEditing: value }),
}));
