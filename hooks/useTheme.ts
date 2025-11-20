"use client";
import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

interface UseThemeProps {
  initialTheme?: Theme;
}

export function useTheme({ initialTheme = "light" }: UseThemeProps = {}) {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      document.documentElement.classList.toggle(
        "dark",
        initialTheme === "dark"
      );
    }
  }, [initialTheme]);

  // toggleTheme sada može primiti opcionalni argument
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
