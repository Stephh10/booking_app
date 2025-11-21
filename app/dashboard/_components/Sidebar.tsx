"use client";

import React, { useEffect } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  Users,
  MessageSquare,
  Settings,
  LayoutPanelLeft,
  LogOut,
  CalendarClock,
} from "lucide-react";

import { signOut } from "next-auth/react";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutPanelLeft },
  { name: "Appointments", href: "/dashboard/appointments", icon: Calendar },
  { name: "Patients", href: "/dashboard/patients", icon: Users },
  {
    name: "Availability",
    href: "/dashboard/availability",
    icon: CalendarClock,
  },
  { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

import { useTheme } from "@/hooks/useTheme";

export default function Sidebar() {
  const { theme } = useTheme();
  const pathname = usePathname();

  function handleLogout() {
    signOut({ callbackUrl: "/login" });
  }

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="hidden md:block bg-[var(--secondary)] h-[500px] lg:h-[852px] w-60 rounded-lg py-2 text-[var(--text)] overflow-hidden">
      <Link
        className="text-2xl text-[var(--text-dark)] cursor-pointer"
        href={"/"}
      >
        BookingSite
      </Link>
      <nav className="flex flex-col gap-2 mt-2 h-[93.5%] overflow-hidden ">
        {links.map((link) => {
          const isActive = pathname === link.href;

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
              {link.name}
            </Link>
          );
        })}
        <div className="mt-auto navFooter">
          <div className="text-center">
            <Link className="sidebarLink" href={"/"}>
              Support
            </Link>
            <Link className="sidebarLink" href={"/"}>
              Privacy Policy
            </Link>
            <Link className="sidebarLink" href={"/"}>
              Terms & Conditions
            </Link>
          </div>
          <Link
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 transition-colors text-gray-600 hover:bg-[var(--card)]"
            href={"/"}
          >
            <LogOut size={20} />
            Logout
          </Link>
        </div>
      </nav>
    </div>
  );
}
