import React from "react";
import DashboardNav from "../_components/DashboardNav";
import SettingsMain from "./_components/SettingsMain";

export default function page() {
  return (
    <div>
      <DashboardNav />
      <div className="mt-4 bg-[var(--bg)] rounded-lg p-4">
        <SettingsMain />
      </div>
    </div>
  );
}
