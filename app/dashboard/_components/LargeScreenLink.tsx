import React from "react";
import Link from "next/link";
import { useThemeState } from "@/store/useTheme";
import clsx from "clsx";

export default function LargeScreenLink({
  link,
  isActive,
}: {
  link: any;
  isActive: boolean;
}) {
  const { theme } = useThemeState();
  return (
    <Link
      key={link.name}
      href={link.href}
      className={clsx(
        "flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-[var(--card)] hover:text-[var(--btn-primary)] transition-all duration-00 ease-out ",
        isActive &&
          "text-[var(--btn-primary)] font-medium border-l-10 border-[var(--btn-primary)] bg-[var(--card)] rounded-tl-[16px] rounded-bl-[16px] overflow-hidden shadow-sm",
        !isActive && "hover:scale-[1.02]",
        theme === "dark" &&
          "bg-[var(--secondary)] text-white hover:bg-[var(--text-soft)]"
      )}
    >
      <link.icon size={20} />
      <span>{link.name}</span>
    </Link>
  );
}
