import React from "react";
import WorkTimeCard from "./WorkTimeCard";
import { useTransition, useEffect, useState } from "react";
import { getAvailableDays } from "@/app/actions/availability";
import { DoctorAvailability } from "@prisma/client";
import { Spinner } from "@/components/ui/spinner";

const daysInWeek = [
  { dayName: "Sunday", dayOfWeek: 0 },
  { dayName: "Monday", dayOfWeek: 1 },
  { dayName: "Tuesday", dayOfWeek: 2 },
  { dayName: "Wednesday", dayOfWeek: 3 },
  { dayName: "Thursday", dayOfWeek: 4 },
  { dayName: "Friday", dayOfWeek: 5 },
  { dayName: "Saturday", dayOfWeek: 6 },
];

export default function WorkTimeSettings() {
  const [isPending, startTransition] = useTransition();
  const [availableDays, setAvailableDays] = useState<DoctorAvailability[]>([]);

  useEffect(() => {
    startTransition(async () => {
      const response = await getAvailableDays();

      if ("error" in response) return;

      setAvailableDays(response);
    });
  }, []);

  return (
    <div>
      <h1 className="settingsHeader">Work Settings</h1>

      {isPending ? (
        <div>
          <Spinner className="mx-auto size-6" />
        </div>
      ) : (
        <div className="workSettingsDetails grid  grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
          {daysInWeek.map((day, index) => {
            const dayData = availableDays.find(
              (item) => item.dayOfWeek === index
            );
            return (
              <WorkTimeCard
                key={index}
                selectedCardDay={day}
                selectedDay={dayData}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
