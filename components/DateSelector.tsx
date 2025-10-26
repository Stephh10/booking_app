import React from "react";
import { useState } from "react";
import { setHours, setMinutes, setSeconds } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DateSelectorProps = {
  setSelectedDateTime: (date: Date) => void;
  selectedDateTime: Date;
};

export default function DateSelector({
  selectedDateTime,
  setSelectedDateTime,
}: DateSelectorProps) {
  console.log(selectedDateTime);
  return (
    <DatePicker
      className="w-full h-[35px] pl-2 bg-white rounded-lg"
      selected={selectedDateTime}
      onChange={(date: any) => setSelectedDateTime(date)}
      showTimeSelect
      timeFormat="HH:mm:ss"
      injectTimes={[
        setHours(setMinutes(setSeconds(new Date(), 10), 1), 0),
        setHours(setMinutes(new Date(), 5), 12),
        setHours(setMinutes(new Date(), 59), 23),
      ]}
      dateFormat="MMMM d, yyyy h:mm aa"
    />
  );
}
