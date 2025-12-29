import React from "react";
import DashboardNav from "../_components/DashboardNav";
import SettingsMain from "./_components/SettingsMain";
import { getUser } from "@/app/actions/user";
import PageHeader from "@/components/PageHeader";
import SettingsEditingBtn from "./_components/SettingsEditingBtn";
import TabList from "./_components/TabList";
import GeneralSettings from "./_components/GeneralSettings";
import PreferencesSettings from "./_components/PreferencesSettings";
import AccountSettings from "./_components/AccountSettings";
import BillingsSettings from "./_components/BillingsSettings";

export default async function page({
  searchParams,
}: {
  searchParams: { view?: string };
}) {
  const userData = await getUser();
  const view = searchParams.view ?? "";
  return (
    <div>
      <DashboardNav />
      <div className="mt-4 bg-[var(--secondary)] rounded-lg p-4">
        {"error" in userData ? (
          <h1>{userData.error}</h1>
        ) : (
          <>
            <PageHeader
              title="Settings"
              description="Manage your account settings."
            >
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
        )}
      </div>
    </div>
  );
}
