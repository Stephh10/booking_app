"use client";
import { useEffect, useState } from "react";
import { useThemeState } from "@/store/useTheme";

export type Theme = "light" | "dark";

export function useTheme(initialTheme: Theme = "light") {
  // const [theme, setTheme] = useState<Theme>(initialTheme);

  const { theme, toggleThemeState: setTheme } = useThemeState();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;

    const activeTheme = savedTheme ?? initialTheme;
    setTheme();

    document.documentElement.classList.toggle("dark", activeTheme === "dark");
  }, [initialTheme]);

  const toggleTheme = (newTheme?: Theme) => {
    const nextTheme: Theme = newTheme
      ? newTheme
      : theme === "light"
      ? "dark"
      : "light";

    setTheme();
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    localStorage.setItem("theme", nextTheme);
  };

  return { theme, toggleTheme };
}
