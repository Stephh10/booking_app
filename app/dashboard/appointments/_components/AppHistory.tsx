import React from "react";
import HistoryTable from "../../_components/HistoryTable";
import { getPatientAppointments } from "@/app/actions/appointments";
import { Appointment } from "@prisma/client";

export default async function AppHistory({ patientId }: { patientId: string }) {
  const appointments: Appointment[] | { error: string } =
    await getPatientAppointments(patientId);

  return (
    <div>
      {"error" in appointments ? (
        <p>{appointments.error}</p>
      ) : (
        <HistoryTable data={appointments} />
      )}
    </div>
  );
}
