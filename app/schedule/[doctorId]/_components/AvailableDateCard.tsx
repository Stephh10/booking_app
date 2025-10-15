import React from "react";
import { formatScheduleTime } from "@/lib/formatScheduleTime";

export default function AvailableDateCard({ dateData }: { dateData: any }) {
  const formatedDate = formatScheduleTime(dateData);

  return (
    <div
      className={`w-full p-4 border rounded-lg my-4 cursor-pointer bg-[var(--btn-primary)] text-amber-50 transform transition duration-150 ease-in-out hover:scale-105 shadow-md hover:shadow-lg`}
    >
      <h1 className="text-2xl text-center">{formatedDate}</h1>
    </div>
  );
}
