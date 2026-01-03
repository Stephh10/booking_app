"use client";

import React, { useEffect, useState } from "react";
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
  ArrowLeftToLine as ArrowLeft,
  ArrowRightToLine as ArrowRight,
} from "lucide-react";
import LargeScreenLink from "./LargeScreenLink";
import MobileScreenLink from "./MobileScreenLink";
import clsx from "clsx";
import { useThemeState } from "@/store/useTheme";
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

export default function Sidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(true);

  const { theme, setTheme } = useThemeState();

  function handleLogout() {
    signOut({ callbackUrl: "/login" });
  }

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    const handleResize = () => {
      setExpanded(window.innerWidth >= 700);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={clsx(
        "flex-none bg-[var(--secondary)] h-[600px] lg:h-[500px] w-60 rounded-lg sm:p-0 md:py-2 text-[var(--text)]",
        !expanded && "!w-13 !h-max"
      )}
    >
      <div className="flex items-center justify-between sm:none md:h-[50px]">
        {expanded && (
          <Link href={"/"} className="cursor-pointer">
            <img
              className="w-160 -ml-4 h-auto pt-2"
              src={theme === "light" ? "/logo.png" : "/logo-light.png"}
              alt="logo"
            />
          </Link>
        )}
        <div className="w-full">
          {expanded ? (
            <button
              className="bg-inherit text-gray-500 p-2 cursor-pointer flex justify-self-end"
              onClick={() => setExpanded(false)}
            >
              <ArrowLeft size={20} />
            </button>
          ) : (
            window.innerWidth > 700 && (
              <button
                className="bg-inherit text-gray-500 p-2 cursor-pointer w-full flex justify-center"
                onClick={() => setExpanded(true)}
              >
                <ArrowRight size={20} />
              </button>
            )
          )}
        </div>
      </div>

      <nav
        className={clsx(
          "flex flex-col gap-2 m-0 md:mt-2 h-[93.5%] overflow-hidden",
          !expanded && "!h-max"
        )}
      >
        {links.map((link) => {
          const isActive = pathname === link.href;

          return expanded ? (
            <LargeScreenLink key={link.name} link={link} isActive={isActive} />
          ) : (
            <MobileScreenLink key={link.name} link={link} isActive={isActive} />
          );
        })}
        <div className="mt-auto navFooter">
          {expanded && (
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
          )}
          <Link
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 transition-colors text-gray-600 hover:bg-[var(--card)]  mb-0 md:mb-4"
            href={"/"}
          >
            <LogOut className={clsx(!expanded && "ml-0.5")} size={20} />
            {expanded && "Logout"}
          </Link>
        </div>
      </nav>
    </div>
  );
}
