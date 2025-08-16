"use client";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Appointment } from "@prisma/client";
const localizer = momentLocalizer(moment);

type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource?: Appointment;
};

export default function DashboardCalendar({ appointments }: any) {
  const events: CalendarEvent[] = appointments.map((appt: any) => ({
    title: appt.reason || "Appointment",
    start: new Date(appt.date),
    end: new Date(appt.date.getTime() + appt.duration * 60000),
    allDay: false,
    resource: appt,
  }));

  return (
    <div className="min-h-[500px]">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={(event) => {
          return {
            style: {
              padding: "4px 10px",
              margin: "2px 0",
              borderRadius: "8px",
              fontSize: "0.875rem",
              border: "1px solid rgba(0,0,0,0.1)",
            },
          };
        }}
      />
    </div>
  );
}
