"use client";
import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

export function useTheme(initialTheme: Theme = "light") {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;

    const activeTheme = savedTheme ?? initialTheme;
    setTheme(activeTheme);

    document.documentElement.classList.toggle("dark", activeTheme === "dark");
  }, [initialTheme]);

  const toggleTheme = (newTheme?: Theme) => {
    const nextTheme: Theme = newTheme
      ? newTheme
      : theme === "light"
      ? "dark"
      : "light";

    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    localStorage.setItem("theme", nextTheme);
  };

  return { theme, toggleTheme };
}
