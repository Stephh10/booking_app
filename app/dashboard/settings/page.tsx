import React from "react";
import DashboardNav from "../_components/DashboardNav";
import SettingsMain from "./_components/SettingsMain";
import { getUser } from "@/app/actions/user";

export default async function page() {
  const userData = await getUser();

  return (
    <div>
      <DashboardNav />
      <div className="mt-4 bg-[var(--secondary)] rounded-lg p-4">
        {"error" in userData ? (
          <h1>{userData.error}</h1>
        ) : (
          <SettingsMain userData={userData} />
        )}
      </div>
    </div>
  );
}
