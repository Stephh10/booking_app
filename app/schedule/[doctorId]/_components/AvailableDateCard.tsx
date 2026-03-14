import React from "react";
import { formatScheduleTime } from "@/lib/formatScheduleTime";

export default function AvailableDateCard({
  dateData,
  isActive,
  formatedDate,
  onClick,
}: {
  dateData: any;
  isActive: boolean;
  formatedDate: any;
  onClick: (dateData: any) => void;
}) {
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
