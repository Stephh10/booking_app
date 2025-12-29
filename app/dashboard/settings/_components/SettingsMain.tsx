"use client";

import React from "react";
import PageHeader from "@/components/PageHeader";

import { useSearchParams } from "next/navigation";
import TabList from "./TabList";
import GeneralSettings from "./GeneralSettings";
import AccountSettings from "./AccountSettings";
import PreferencesSettings from "./PreferencesSettings";
import BillingsSettings from "./BillingsSettings";
import SettingsEditingBtn from "./SettingsEditingBtn";

import { User, ProfileImage } from "@prisma/client";

export default function SettingsMain({
  userData,
}: {
  userData: User & { profileImage?: ProfileImage | null };
}) {
  const searchParams = useSearchParams();
  const view = searchParams.get("view");

  return (
    <>
      <PageHeader title="Settings" description="Manage your account settings.">
        <SettingsEditingBtn />
      </PageHeader>
      <div className="mt-4 2 bg-[var(--secondary)] p-4 rounded-2xl ">
        <TabList />
        {!view && <GeneralSettings userData={userData} />}
        {view === "account" && <AccountSettings userData={userData} />}
        {view === "preferences" && <PreferencesSettings />}
        {view === "billings" && <BillingsSettings />}
      </div>
    </>
  );
}
