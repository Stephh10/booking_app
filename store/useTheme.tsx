import { create } from "zustand";

export const useThemeState = create<{
  theme: "light" | "dark";
  toggleThemeState: () => void;
}>((set) => ({
  theme: "light",
  toggleThemeState: () =>
    set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
}));
