"use client";

import { TabsTrigger } from "@radix-ui/react-tabs";
import { useRouter } from "next/navigation";

export default function TabListButton({ value }: { value: string }) {
  const router = useRouter();
  const view = value.toLowerCase();

  return (
    <TabsTrigger
      onClick={() =>
        router.push(
          view === "general"
            ? "/dashboard/settings"
            : `/dashboard/settings?view=${view}`
        )
      }
      className="menuTab
        data-[state=active]:bg-[var(--btn-primary)] 
        data-[state=active]:text-white"
      value={view}
    >
      {value}
    </TabsTrigger>
  );
}
