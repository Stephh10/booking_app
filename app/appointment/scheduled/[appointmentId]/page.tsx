import React from "react";
import { CircleCheckBig } from "lucide-react";
import ScheduleFooter from "@/app/schedule/[doctorId]/_components/ScheduleFooter";
import { getScheduleData } from "@/app/actions/schedule";
import { formatAppointmentTime } from "@/lib/formatAppointmentTime";
import { formatAppointmentDate } from "@/lib/formatAppointmentDate";
import Link from "next/link";

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
    <div className="container h-max">
      <div className="h-[100vh] flex flex-col items-center justify-center">
        <div className="relative bg-[var(--bg)] p-4 py-6 w-[600px] rounded-lg text-center -mt-20">
          <div className="absolute -left-5 -top-8 w-[200px]">
            <Link href="/" className="w-[200px]">
              <img src="/logo.png" alt="logo" />
            </Link>
          </div>
          <CircleCheckBig
            size={85}
            className="mx-auto text-[var(--lp-primary)]"
          />
          <h2 className="text-xl font-bold my-2">Request received</h2>
          {appointmentData.doctorInfo && (
            <>
              <p>
                Your appointment with{" "}
                <b>
                  Dr {appointmentData.doctorInfo.firstName}{" "}
                  {appointmentData.doctorInfo.lastName}
                </b>
                <br />
                on <b>
                  {formatAppointmentDate(appointmentData.date)}
                </b> from{" "}
                <b>
                  {formatAppointmentTime(
                    appointmentData.date,
                    appointmentData.duration,
                  )}{" "}
                </b>
                has been secessfully submitted.
              </p>
              <p>You will be notified via email once confirmed.</p>
            </>
          )}
        </div>
        <ScheduleFooter />
      </div>
    </div>
    // <div className="container h-screen">
    //   <Link
    //     className="font-bold text-lg font-lg w-[180px] mt-3 -ml-9 md:-ml-7"
    //     href={"/"}
    //   >
    //     <img src="/logo.png" alt="logo" />
    //   </Link>
    //   <div className="h-[100vh] flex flex-col items-center justify-center">
    //     <div className="bg-[var(--bg)] p-4 py-6 max-w-[450px] rounded-lg text-center -mt-20">
    //       <CircleCheckBig size={85} color="green" className="mx-auto" />
    //       <h2 className="text-xl font-bold my-2">Appointment confirmed</h2>
    //       {appointmentData.doctorInfo && (
    //         <p>
    //           Your appointment with{" "}
    //           <b>
    //             Dr {appointmentData.doctorInfo.firstName}{" "}
    //             {appointmentData.doctorInfo.lastName}
    //           </b>
    //           <br />
    //           on <b>{formatAppointmentDate(appointmentData.date)}</b> from{" "}
    //           {formatAppointmentTime(
    //             appointmentData.date,
    //             appointmentData.duration,
    //           )}{" "}
    //           has been secessfully scheduled.
    //         </p>
    //       )}
    //     </div>
    //     <ScheduleFooter />
    //   </div>
    // </div>
  );
}
