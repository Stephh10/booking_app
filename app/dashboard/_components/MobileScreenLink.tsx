import React from "react";
import Link from "next/link";

export default function MobileScreenLink({ link, isActive }: any) {
  return (
    <Link
      key={link.name}
      href={link.href}
      className={`
        flex flex-col items-center justify-center p-3 
         rounded-xl transition-all 
        ${
          isActive
            ? "text-[var(--text)] bg-[var(--btn-primary)] "
            : "text-gray-500 hover:text-[var(--btn-primary)]"
        }
      `}
    >
      <link.icon size={22} />
    </Link>
  );
}
