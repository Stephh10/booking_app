import React from "react";
import DashboardNav from "../_components/DashboardNav";
import PageHeader from "@/components/PageHeader";

import { getAvailableDays } from "@/app/actions/availability";
import { DoctorAvailability } from "@prisma/client";
import WorkTimeCard from "./_components/WorkTimeCard";

const daysInWeek = [
  { dayName: "Sunday", dayOfWeek: 0 },
  { dayName: "Monday", dayOfWeek: 1 },
  { dayName: "Tuesday", dayOfWeek: 2 },
  { dayName: "Wednesday", dayOfWeek: 3 },
  { dayName: "Thursday", dayOfWeek: 4 },
  { dayName: "Friday", dayOfWeek: 5 },
  { dayName: "Saturday", dayOfWeek: 6 },
];

export default async function page() {
  const availabilityData: DoctorAvailability[] | { error: string } =
    await getAvailableDays();

  if ("error" in availabilityData) return <h1>{availabilityData.error}</h1>;
  return (
    <div>
      <DashboardNav />
      <div className="mt-4 bg-[var(--secondary)] rounded-lg p-4">
        <PageHeader
          title="Availability"
          description="Set your working days and hours to let patients know when you’re available."
        >
          {""}
        </PageHeader>
        <div className="workSettingsDetails grid  grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 mt-4">
          {daysInWeek.map((day, index) => {
            const dayData = availabilityData.find(
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
        <div className="line">s</div>
      </div>
    </div>
  );
}
