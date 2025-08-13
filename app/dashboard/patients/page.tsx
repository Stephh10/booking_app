import React from "react";
import DashboardNav from "../_components/DashboardNav";

export default function page() {
  return (
    <div className="">
      <DashboardNav />
      <div className="patientsMain bg-[var(--secondary)] mt-4 rounded-xl p-4">
        <h2>Patients here</h2>
      </div>
      <h2>Patients page</h2>
    </div>
  );
}
