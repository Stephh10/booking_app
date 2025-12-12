import React from "react";
import Link from "next/link";

export default function LargeScreenLink({ link, isActive }: any) {
  return (
    <Link
      key={link.name}
      href={link.href}
      className={`flex items-center gap-3 px-3 py-2 transition-colors
                    ${
                      isActive
                        ? "text-[var(--btn-primary)] font-medium border-l-10 border-[var(--btn-primary)] bg-[var(--card)] rounded-tl-[16px] rounded-bl-[16px] overflow-hidden shadow-sm"
                        : "text-gray-600 hover:bg-[var(--card)]"
                    }
                  `}
    >
      <link.icon size={20} />
      <span>{link.name}</span>
    </Link>
  );
}
