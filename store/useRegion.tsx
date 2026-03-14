import { create } from "zustand";

export const useRegion = create<{
  region: string | null;
  setRegion: (value: string) => void;
}>((set) => ({
  region: null,
  setRegion: (value) => set({ region: value }),
}));
