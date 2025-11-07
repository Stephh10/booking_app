import React from "react";
import WorkTimeCard from "./WorkTimeCard";

const daysInWeek = [
  {
    day: "monday",
    available: true,
    startTime: "",
    endTime: "",
  },
  {
    day: "tuesday",
    available: true,
    startTime: "",
    endTime: "",
  },
  {
    day: "wednesday",
    available: true,
    startTime: "",
    endTime: "",
  },
  {
    day: "thursday",
    available: true,
    startTime: "",
    endTime: "",
  },
  {
    day: "friday",
    available: true,
    startTime: "",
    endTime: "",
  },
  {
    day: "saturday",
    available: true,
    startTime: "",
    endTime: "",
  },
  {
    day: "sunday",
    available: true,
    startTime: "",
    endTime: "",
  },
];

export default function WorkTimeSettings() {
  return (
    <div>
      <h1 className="settingsHeader">Work Settings</h1>
      <div className="workSettingsDetails grid  grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
        {daysInWeek.map((day, index) => (
          <WorkTimeCard key={index} />
        ))}
      </div>
    </div>
  );
}
