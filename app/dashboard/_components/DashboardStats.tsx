import React from "react";
import DashboardCard from "./DashboardCard";
import { getAllPatients } from "@/app/actions/patients";
import { getTodaysAppointments } from "@/app/actions/appointments";
import { getNextAppointment } from "@/app/actions/appointments";
import { getPastAppointments } from "@/app/actions/appointments";
import { formatDate } from "@/lib/formatDate";
export default async function DashboardStats() {
  const [patientsData, todaysAppData, nextAppData, pastAppData] =
    await Promise.all([
      getAllPatients(),
      getTodaysAppointments(),
      getNextAppointment(),
      getPastAppointments(),
    ]);

  return (
    <div className="flex flex-col gap-4 my-4 md:flex-row md:gap-2  ">
      <DashboardCard
        title="Today's Appointments"
        value={Array.isArray(todaysAppData) ? todaysAppData.length : 0}
        className="dashboardStats bg-[var(--btn-primary)] text-[var(--text)]"
        link={`/dashboard/appointments?view=today`}
      />
      <DashboardCard
        title="Next Appointment"
        value={
          "error" in nextAppData ? "" : formatDate(nextAppData.appointment.date)
        }
        className="dashboardStats"
        desc={
          "error" in nextAppData
            ? nextAppData.error
            : `${nextAppData.patient.firstName} ${nextAppData.patient.lastName}`
        }
        link={
          "error" in nextAppData
            ? "/"
            : `/dashboard/appointments/${nextAppData.appointment.id}`
        }
      />
      <DashboardCard
        title="Total Patients"
        value={patientsData.length}
        className="dashboardStats"
        link={`/dashboard/patients`}
      />
      <DashboardCard
        title="Completed Today"
        value={Array.isArray(pastAppData) ? pastAppData.length : 0}
        className="dashboardStats"
        link={`/dashboard/appointments?view=completed`}
      />
    </div>
  );
}
