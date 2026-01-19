"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { SquarePen } from "lucide-react";
import NotificationActions from "./NotificationActions";
import NotificationCard from "./NotificationCard";
import { getPendingAppointments } from "@/app/actions/appointments";
import clsx from "clsx";
import { cancelAllAppointments } from "@/app/actions/appointments";

type AvailableAppointments = Awaited<ReturnType<typeof getPendingAppointments>>;

export function Notification({
  appointments,
}: {
  appointments: AvailableAppointments;
}) {
  function handleCancelAppointments() {
    cancelAllAppointments();
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="relative bg-[var(--btn-primary)] hover:bg-[var(--btn-primary)] cursor-pointer w-10 h-10 rounded-full text-white hover:text-white"
          variant="outline"
        >
          <div
            className={clsx(
              "absolute top-[-3px] right-[-3px] bg-[var(--destructive)] w-4 h-4 rounded-full flex items-center justify-center",
              !appointments &&
                "bg-white text-[var(--btn-primary)] border border-[var(--btn-primary)]",
            )}
          >
            {Array.isArray(appointments) ? appointments.length : 0}
          </div>
          <Bell size={22} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[400px] p-2" align="end">
        <div className="flex items-center justify-between">
          <h1>Notifications</h1>
          <div
            onClick={handleCancelAppointments}
            className="text-[var(--btn-primary)] flex items-center gap-1  cursor-pointer underline"
          >
            <SquarePen size={16} />
            <p>Cancel all requests</p>
          </div>
        </div>

        <NotificationActions />
        {Array.isArray(appointments) && appointments.length ? (
          appointments.map((item) => (
            <NotificationCard key={item.id} data={item} />
          ))
        ) : (
          <p className="text-center text-[var(--text-soft)]">
            No Available Appointments
          </p>
        )}
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
