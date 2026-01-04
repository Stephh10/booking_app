import React from "react";
import DashboardNav from "../_components/DashboardNav";
import { getUser } from "@/app/actions/user";
import PageHeader from "@/components/PageHeader";
import SettingsEditingBtn from "./_components/SettingsEditingBtn";
import TabList from "./_components/TabList";
import GeneralSettings from "./_components/GeneralSettings";
import PreferencesSettings from "./_components/PreferencesSettings";
import AccountSettings from "./_components/AccountSettings";
import BillingsSettings from "./_components/BillingsSettings";
import { getPlans } from "@/app/actions/plans";

export default async function page({
  searchParams,
}: {
  searchParams: { view?: string };
}) {
  const userData = await getUser();
  const plans = await getPlans();
  const view = searchParams.view ?? "";
  return (
    <div>
      <DashboardNav />
      <div className="mt-4 bg-[var(--secondary)] rounded-lg p-2 md:p-4">
        {"error" in userData ? (
          <h1 className="text-red-500">{String(userData.error)}</h1>
        ) : (
          <>
            <PageHeader
              title="Settings"
              description="Manage your account settings."
            >
              <SettingsEditingBtn />
            </PageHeader>

            <div className="mt-4 bg-[var(--secondary)] py-4 p-1 md:p-4 rounded-2xl">
              <TabList />

              {!view && <GeneralSettings userData={userData} />}

              {view === "account" && <AccountSettings userData={userData} />}

              {view === "preferences" && <PreferencesSettings />}

              {"error" in plans ? (
                <h1 className="text-red-500">{String(plans.error)}</h1>
              ) : (
                view === "billings" && <BillingsSettings plans={plans} />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
