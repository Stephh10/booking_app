"use client";

import React from "react";
import { CircleCheckBig } from "lucide-react";
import ScheduleFooter from "@/app/schedule/[doctorId]/_components/ScheduleFooter";
import { useDemoSchedule } from "@/store/useDemoSchedule";
import { formatAppointmentDate } from "@/lib/formatAppointmentDate";
import { formatAppointmentTime } from "@/lib/formatAppointmentTime";

export default function page() {
  const { date } = useDemoSchedule();
  if (!date) {
    throw new Error("Date is required");
  }
  return (
    <div className="container h-screen">
      <h2>App</h2>
      <div className="h-[100vh] flex flex-col items-center justify-center">
        <div className="bg-[var(--bg)] p-4 py-6 max-w-[500px] rounded-lg text-center -mt-20">
          <CircleCheckBig
            size={85}
            className="mx-auto text-[var(--lp-primary)]"
          />
          <h2 className="text-xl font-bold my-2">Request received</h2>
          <p>
            Your appointment request with <b>Dr. Michael Berger</b>
            <br />
            on <b>{formatAppointmentDate(date)}</b> from{" "}
            <b>{formatAppointmentTime(date, 30)}</b> has been successfully
            submitted.
          </p>
          <p>You will be notified via email once confirmed.</p>
        </div>
        <ScheduleFooter />
      </div>
    </div>
  );
}
