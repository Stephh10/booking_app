import React, { Dispatch } from "react";
import AvailableDateCard from "./AvailableDateCard";

type DateType = {
  dayOfWeek: number;
  startTime: Date;
  endTime: Date;
};

export default function ScheduleTimePicker({
  availableDates,
  activeIndex,
  setActiveIndex,
  setTimeCard,
}: {
  availableDates: DateType[];
  activeIndex: number | null;
  setActiveIndex: Dispatch<React.SetStateAction<number | null>>;
  setTimeCard: React.Dispatch<React.SetStateAction<Date | null>>;
}) {
  return (
    <div className="mainRight flex-1 px-3 overflow-y-scroll h-[390px]">
      {availableDates?.length ? (
        availableDates?.map((data, index) => (
          <AvailableDateCard
            key={index}
            dateData={data}
            isActive={activeIndex === index}
            onClick={(dateData: any) => (
              setActiveIndex(index),
              setTimeCard(dateData)
            )}
          />
        ))
      ) : (
        <div className="h-full flex items-center justify-center">
          <h2 className="text-xl text-center text-[var(--text-soft)]">
            {" "}
            No available time slots for the selected date. Please choose another
            day.
          </h2>
        </div>
      )}
    </div>
  );
}
