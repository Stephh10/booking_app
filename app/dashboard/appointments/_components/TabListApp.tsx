"use client";

import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import clsx from "clsx";
import { useThemeState } from "@/store/useTheme";

export default function TabListApp() {
  const { theme } = useThemeState();
  const tabStyles = clsx(
    "menuTab",
    "data-[state=active]:!bg-[var(--btn-primary)]",
    "data-[state=active]:text-white",
    theme === "dark" && "text-white hover:bg-[var(--text-soft)]"
  );
  return (
    <TabsList className="w-full flex border-1 p-0">
      <TabsTrigger className={tabStyles} value="all">
        All Appointments
      </TabsTrigger>
      <TabsTrigger className={tabStyles} value="today">
        Today's Appointments
      </TabsTrigger>
      <TabsTrigger className={tabStyles} value="completed">
        Completed Today
      </TabsTrigger>
    </TabsList>
  );
}
