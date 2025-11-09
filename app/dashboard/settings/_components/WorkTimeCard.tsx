"use client";
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Clock } from "lucide-react";
import { DoctorAvailability } from "@prisma/client";
import { updateActiveDays } from "@/app/actions/availability";
import { useTransition } from "react";
import { formatWorkCardDate } from "@/lib/dateFormats/formatWorkCardDate";
import { generateTimeSlots } from "@/lib/dateFormats/generateTimeSlots";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function WorkTimeCard({
  selectedDay,
  selectedCardDay,
}: {
  selectedDay: DoctorAvailability | undefined;
  selectedCardDay: any;
}) {
  //TIME CHANGE

  const [startTime, setStartTime] = useState(selectedDay?.startTime);
  const [endTime, setEndTime] = useState(selectedDay?.endTime);

  //ACTIVE DATE
  const [isPending, startTransition] = useTransition();
  const [activeDay, setActiveDay] = useState(selectedDay ? true : false);
  const timeSlots = generateTimeSlots();

  function handleUpdateActiveDays() {
    console.log("Updatinggg");
    setActiveDay((prev) => !prev);

    startTransition(async () => {
      await updateActiveDays(selectedCardDay.dayOfWeek);
    });
  }

  console.log(formatWorkCardDate(endTime!));

  return (
    <div className="workTimeCard border-2 p-2 rounded-lg">
      <div className="flex  items-center justify-between ">
        <div className="flex items-center gap-1">
          <Clock size={17} />
          <h1>Day and Time</h1>
        </div>
        <div className="flex items-center gap-2 text-[var(--text-soft)]">
          <p>{activeDay ? "Available" : " Not Available"}</p>
          <Switch
            checked={activeDay}
            onCheckedChange={handleUpdateActiveDays}
          />
        </div>
      </div>
      <div className="cardBody mt-5">
        <div className="workTimeCardSelector">
          <h1 className="flex-1">Day</h1>
          <Select>
            <SelectTrigger
              disabled={!activeDay}
              className="flex-6 [&_svg]:hidden"
            >
              <SelectValue placeholder={selectedCardDay.dayName} />
            </SelectTrigger>
          </Select>
        </div>
        <div className="workTimeCardSelector">
          <h1 className="flex-1">From</h1>
          <Select value={formatWorkCardDate(startTime!)}>
            <SelectTrigger disabled={!activeDay} className="flex-6">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {timeSlots.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="workTimeCardSelector">
          <h1 className="flex-1">To</h1>
          <Select value={formatWorkCardDate(endTime!)}>
            <SelectTrigger disabled={!activeDay} className="flex-6">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {timeSlots.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
