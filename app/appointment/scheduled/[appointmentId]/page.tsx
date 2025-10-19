import React from "react";
import { CircleCheckBig } from "lucide-react";
import ScheduleFooter from "@/app/schedule/[doctorId]/_components/ScheduleFooter";
import { getScheduleData } from "@/app/actions/schedule";
import { formatAppointmentTime } from "@/lib/formatAppointmentTime";
import { formatAppointmentDate } from "@/lib/formatAppointmentDate";

export default async function page({
  params,
}: {
  params: { appointmentId: string };
}) {
  const paramsData = await params;
  const appId = paramsData.appointmentId;

  const appointmentData = await getScheduleData(appId);

  if ("error" in appointmentData) {
    return <p>Error: {appointmentData.error}</p>;
  }
  if (appointmentData.date == undefined) return <p>Something went wrong</p>;
  return (
    <div className="container h-screen">
      <h2>App</h2>
      <div className="h-[100vh] flex flex-col items-center justify-center">
        <div className="bg-[var(--bg)] p-4 py-6 max-w-[450px] rounded-lg text-center -mt-20">
          <CircleCheckBig size={85} color="green" className="mx-auto" />
          <h2 className="text-xl font-bold my-2">Appointment confirmed</h2>
          {appointmentData.doctorInfo && (
            <p>
              Your appointment with{" "}
              <b>
                Dr {appointmentData.doctorInfo.firstName}{" "}
                {appointmentData.doctorInfo.lastName}
              </b>
              <br />
              on <b>{formatAppointmentDate(appointmentData.date)}</b> from{" "}
              {formatAppointmentTime(
                appointmentData.date,
                appointmentData.duration
              )}{" "}
              has been secessfully scheduled.
            </p>
          )}
        </div>
        <ScheduleFooter />
      </div>
    </div>
  );
}
