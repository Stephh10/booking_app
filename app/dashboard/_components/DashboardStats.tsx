import React from "react";
import DashboardCard from "./DashboardCard";
import { getAllPatients } from "@/app/actions/patients";
import { getTodaysAppointments } from "@/app/actions/appointments";

export default async function DashboardStats() {
  const patientsData = await getAllPatients();
  const todaysAppData = await getTodaysAppointments();

  return (
    <div className="flex gap-2 my-4">
      <DashboardCard
        title="Today's Appointments"
        value={Array.isArray(todaysAppData) ? todaysAppData.length : 0}
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
        value={patientsData.length}
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
