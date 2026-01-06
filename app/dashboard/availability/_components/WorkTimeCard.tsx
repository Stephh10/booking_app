"use client";
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Clock, CloudHail } from "lucide-react";
import { DoctorAvailability } from "@prisma/client";
import { updateActiveDays } from "@/app/actions/availability";
import { useTransition } from "react";
import { formatWorkCardDate } from "@/lib/dateFormats/formatWorkCardDate";
import { generateTimeSlots } from "@/lib/dateFormats/generateTimeSlots";
import { validateTime } from "@/lib/dateFormats/validateTime";
import { updateDayTime } from "@/app/actions/availability";
import { toast } from "react-toastify";

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
  const [selectedTime, setSelectedTime] = useState({
    from: selectedDay?.startTime || null,
    to: selectedDay?.endTime || null,
  });

  //ACTIVE DATE CARD
  const [isPending, startTransition] = useTransition();
  const [activeDay, setActiveDay] = useState(selectedDay ? true : false);

  const timeSlots = generateTimeSlots();

  function handleUpdateActiveDays() {
    setActiveDay((prev) => !prev);
    setSelectedTime({
      from: null,
      to: null,
    });

    startTransition(async () => {
      await updateActiveDays(selectedCardDay.dayOfWeek);
    });
  }

  function handleTimeUpdate(type: string, time: string) {
    const newTimes = { ...selectedTime, [type]: time };

    setSelectedTime(newTimes);

    if (newTimes.from && newTimes.to) {
      const isValid = validateTime(
        formatWorkCardDate(newTimes.from),
        formatWorkCardDate(newTimes.to)
      );

      if (!isValid) {
        toast.error("Please enter valid time", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
      startTransition(async () => {
        await updateDayTime(
          selectedCardDay.dayOfWeek,
          newTimes.from!,
          newTimes.to!
        );
      });
    }
  }

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
          <Select
            onValueChange={(v: string) => handleTimeUpdate("from", v)}
            value={formatWorkCardDate(selectedTime.from)}
          >
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
          <Select
            onValueChange={(v: string) => handleTimeUpdate("to", v)}
            value={formatWorkCardDate(selectedTime.to!)}
          >
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
