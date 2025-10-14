import React from "react";

export default function AvailableDateCard({ dateData }: { dateData: any }) {
  return (
    <div
      className={`w-full p-4 border rounded-lg my-3 cursor-pointer ${
        dateData.available
          ? "bg-[var(--btn-primary)] text-amber-50"
          : "bg-[var(--bg)]"
      }`}
    >
      <h1 className="text-xl">{dateData.date}</h1>
      <h1 className="text-xl">
        {dateData.available ? "Available" : "Not Available"}
      </h1>
    </div>
  );
}
