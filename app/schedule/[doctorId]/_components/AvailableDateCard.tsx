import React from "react";
import { formatScheduleTime } from "@/lib/formatScheduleTime";

export default function AvailableDateCard({
  dateData,
  isActive,
  onClick,
}: {
  dateData: any;
  isActive: boolean;
  onClick: (dateData: any) => void;
}) {
  const formatedDate = formatScheduleTime(dateData);

  return (
    <div
      onClick={() => onClick(dateData.startTime)}
      className={`p-4 border rounded-lg my-4 cursor-pointer bg-[var(--btn-primary)] text-amber-50 transform transition duration-150 shadow-md hover:shadow-lg ${
        isActive ? " bg-[var(--lp-light)] " : ""
      }`}
    >
      <h1 className="text-xl text-center">{formatedDate}</h1>
    </div>
  );
}
