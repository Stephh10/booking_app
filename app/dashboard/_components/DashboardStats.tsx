import React from "react";
import DashboardCard from "./DashboardCard";
import { getAllPatients } from "@/app/actions/patients";
import { getTodaysAppointments } from "@/app/actions/appointments";
import { getNextAppointment } from "@/app/actions/appointments";
import { formatDate } from "@/lib/formatDate";
import { getPastAppointments } from "@/app/actions/appointments";
export default async function DashboardStats() {
  const [patientsData, todaysAppData, nextAppData, pastAppData] =
    await Promise.all([
      getAllPatients(),
      getTodaysAppointments(),
      getNextAppointment(),
      getPastAppointments(),
    ]);

  return (
    <div className="flex gap-2 my-4">
      <DashboardCard
        title="Today's Appointments"
        value={Array.isArray(todaysAppData) ? todaysAppData.length : 0}
        className="dashboardStats bg-[var(--btn-primary)] text-[var(--text)]"
      />
      <DashboardCard
        title="Next Appointment"
        value={"error" in nextAppData ? "" : formatDate(nextAppData.date)}
        className="dashboardStats"
        desc={
          "error" in nextAppData
            ? nextAppData.error
            : `${nextAppData.patient.firstName} ${nextAppData.patient.lastName}`
        }
      />
      <DashboardCard
        title="Total Patients"
        value={patientsData.length}
        className="dashboardStats"
      />
      <DashboardCard
        title="Completed Today"
        value={Array.isArray(pastAppData) ? pastAppData.length : 0}
        className="dashboardStats"
      />
    </div>
  );
}
