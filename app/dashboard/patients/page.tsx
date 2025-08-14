import React from "react";
import DashboardNav from "../_components/DashboardNav";
import PageHeader from "@/components/PageHeader";
import { PatientsTable } from "./_components/PatientsTable";

export default function page() {
  return (
    <div>
      <DashboardNav />
      <div className="patientsMain bg-[var(--secondary)] mt-4 rounded-xl p-4">
        <PageHeader
          title="Patients"
          description="Organize, track, and care for your patients effortlessly."
        >
          <button className="outlineBtn">Create Patient</button>
        </PageHeader>
        <PatientsTable />
      </div>
    </div>
  );
}
