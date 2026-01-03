"use client";
import { useEffect } from "react";
import { useThemeState } from "@/store/useTheme";

export type Theme = "light" | "dark";

export function useTheme(themeProp?: Theme) {
  const { theme, setTheme } = useThemeState();

  useEffect(() => {
    // prvo provjeri localStorage
    const storedTheme = localStorage.getItem("theme") as Theme | null;

    const activeTheme: Theme = storedTheme || themeProp || "light"; // default na light
    setTheme(activeTheme);
    document.documentElement.classList.toggle("dark", activeTheme === "dark");
    localStorage.setItem("theme", activeTheme);
  }, [themeProp, setTheme]);

  const toggleTheme = (newTheme?: Theme) => {
    const nextTheme: Theme = newTheme ?? (theme === "light" ? "dark" : "light");
    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    localStorage.setItem("theme", nextTheme);
  };

  return { theme, toggleTheme };
}
