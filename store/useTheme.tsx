import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleThemeState: () => void;
}

export const useThemeState = create<ThemeState>((set) => ({
  theme: "light",
  setTheme: (theme) => {
    localStorage.setItem("theme", theme);
    set({ theme });
  },
  toggleThemeState: () =>
    set((state) => {
      const next = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", next);
      return { theme: next };
    }),
}));
