import React from "react";
import { CircleCheckBig } from "lucide-react";
import ScheduleFooter from "../[doctorId]/_components/ScheduleFooter";

export default function page() {
  return (
    <div className="container h-screen">
      <h2>App</h2>
      <div className="h-[100vh] flex flex-col items-center justify-center">
        <div className="bg-[var(--bg)] p-4 max-w-[450px] rounded-lg text-center -mt-20">
          <CircleCheckBig size={85} color="green" className="mx-auto" />
          <h2 className="text-xl font-bold my-2">Appointment confirmed</h2>
          <p>
            Your appointment with <b>Dr Kevin Smith</b>
            <br />
            on <b>12/12/2023</b> from <b>9:00 AM</b> to <b>10:00 AM</b> has been
            secessfully scheduled.
          </p>
        </div>
        <ScheduleFooter />
      </div>
    </div>
  );
}
