import React from "react";
import DashboardCard from "./DashboardCard";

export default function DashboardStats() {
  return (
    <div className="flex gap-2 my-4">
      <DashboardCard
        title="Today's Appointments"
        value={5}
        className="dashboardStats bg-[var(--btn-primary)] text-[var(--text)]"
      />
      <DashboardCard
        title="Next Appointment"
        value={"September 5 10AM"}
        className="dashboardStats"
        desc="Kevin Punter"
      />
      <DashboardCard
        title="Total Patients"
        value={"150"}
        className="dashboardStats"
      />
      <DashboardCard
        title="Completed Today"
        value={"5"}
        className="dashboardStats"
      />
    </div>
  );
}
