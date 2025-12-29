"use client";

import React from "react";
import { Tabs, TabsList } from "@radix-ui/react-tabs";
import TabListButton from "./TabListButton";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function TabList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const view = searchParams.get("view");
  return (
    <Tabs
      className=""
      value={view || "general"}
      onValueChange={(val) => {
        router.push(
          `/dashboard/settings${val === "general" ? "" : `?view=${val}`}`
        );
      }}
    >
      <TabsList className="w-full flex border-1 rounded-lg p-0">
        <TabListButton value="General" />
        <TabListButton value="Account" />
        <TabListButton value="Preferences" />
        <TabListButton value="Billings" />
      </TabsList>
      {/* <TabsContent value="general">
            <GeneralSettings userData={userData} />
          </TabsContent>
          <TabsContent value="preferences">
            <PreferencesSettings />
          </TabsContent>

          <TabsContent value="account">
            <AccountSettings userData={userData} />
          </TabsContent>
          <TabsContent value="billings">
            <BillingsSettings />
          </TabsContent> */}
    </Tabs>
  );
}
