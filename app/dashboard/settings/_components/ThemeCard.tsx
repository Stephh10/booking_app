import React from "react";
import { Circle, CircleCheck } from "lucide-react";
import Image from "next/image";

export default function ThemeCard({
  cardThemeValue,
  theme,
  toggleTheme,
}: {
  cardThemeValue: string;
  theme: string;
  toggleTheme: any;
}) {
  return (
    <div
      onClick={() => toggleTheme(cardThemeValue)}
      className={`settingsModeCard ${
        theme === cardThemeValue ? "activeModeCard" : ""
      }`}
    >
      <div className="relative flex-1 w-[250px]">
        <Image
          src={
            cardThemeValue === "light" ? "/mode-light.png" : "/mode-dark.png"
          }
          alt="mode-light"
          fill
        />
      </div>
      <div className="flex justify-between items-center w-full h-[45px] bg-[var(--card)] p-2">
        <p className="text-md font-bold">
          {cardThemeValue === "light"
            ? `Light Mode${theme === "light" ? " (Active)" : ""}`
            : `Dark Mode${theme === "dark" ? " (Active)" : ""}`}
        </p>
        {theme === cardThemeValue ? (
          <CircleCheck size={20} />
        ) : (
          <Circle size={20} />
        )}
      </div>
    </div>
  );
}
