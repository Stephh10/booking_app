"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Users, MessageSquare, Settings } from "lucide-react";

const links = [
  { name: "Appointments", href: "/dashboard", icon: Calendar },
  { name: "Patients", href: "/dashboard/patients", icon: Users },
  { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="bg-[var(--secondary)] h-[500px] w-60 rounded-lg py-2 text-[var(--text)]">
      <Link
        className="text-2xl text-[var(--text-dark)] cursor-pointer"
        href={"/"}
      >
        BookingSite
      </Link>
      <nav className="flex flex-col gap-2 mt-2">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2 transition-colors
                ${
                  isActive
                    ? "text-[var(--btn-primary)] font-medium border-l-10 border-[var(--btn-primary)] bg-[var(--background)] rounded-tl-[16px] rounded-bl-[16px] overflow-hidden shadow-sm"
                    : "text-gray-600 hover:bg-[var(--text)]"
                }
              `}
            >
              <link.icon size={20} />
              {link.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
