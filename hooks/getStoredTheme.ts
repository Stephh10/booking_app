export function getStoredTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("theme");

  if (stored === "dark") return "dark";
  return "light";
}
