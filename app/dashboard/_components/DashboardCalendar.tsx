"use client";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Appointment } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState, useMemo, useEffect } from "react";

const localizer = momentLocalizer(moment);

type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource?: Appointment;
};

export default function DashboardCalendar({ appointments }: any) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const handleViewChange = (newView: string) => {
    setView(newView as "month" | "week" | "day");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [date, setDate] = useState(new Date());

  const events: CalendarEvent[] = useMemo(() => {
    return appointments.map((appt: any) => {
      const startMoment = moment(appt.date, "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
      const startDate = startMoment.toDate();
      const endDate = startMoment.add(appt.duration || 20, "minutes").toDate();
      return {
        title: appt.reason || "Appointment",
        start: startDate,
        end: endDate,
        allDay: false,
        resource: appt,
      };
    });
  }, [appointments]);

  if (!mounted) return null;

  return (
    <div className="min-h-[500px]">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        view={view}
        onView={handleViewChange}
        date={date}
        onNavigate={setDate}
        onSelectEvent={(event) => {
          router.push(`/dashboard/appointments/${event?.resource?.id}`);
        }}
        eventPropGetter={(event) => ({
          style: {
            padding: "4px 10px",
            margin: "2px 0",
            borderRadius: "8px",
            fontSize: "0.875rem",
            border: "1px solid rgba(0,0,0,0.1)",
          },
        })}
      />
    </div>
  );
}
