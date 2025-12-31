"use client";

import { TabsTrigger } from "@radix-ui/react-tabs";
import { useRouter } from "next/navigation";
import { useThemeState } from "@/store/useTheme";
import clsx from "clsx";

export default function TabListButton({ value }: { value: string }) {
  const router = useRouter();
  const view = value.toLowerCase();

  const { theme } = useThemeState();

  return (
    <TabsTrigger
      onClick={() =>
        router.push(
          view === "general"
            ? "/dashboard/settings"
            : `/dashboard/settings?view=${view}`
        )
      }
      className={clsx(
        "menuTab",
        "data-[state=active]:bg-[var(--btn-primary)]",
        "data-[state=active]:text-white",
        theme === "dark" && "text-white hover:bg-[var(--text-soft)]"
      )}
      value={view}
    >
      {value}
    </TabsTrigger>
  );
}
