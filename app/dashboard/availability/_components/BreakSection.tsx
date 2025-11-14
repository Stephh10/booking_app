"use client";

import React, { use, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, CloudHail } from "lucide-react";
import { generateTimeSlots } from "@/lib/dateFormats/generateTimeSlots";
import { useState, useTransition } from "react";
import { DoctorAvailability } from "@prisma/client";
import { validateTime } from "@/lib/dateFormats/validateTime";
import { toast } from "react-toastify";
import { formatWorkCardDate } from "@/lib/dateFormats/formatWorkCardDate";
import { handleCreateBreakTime } from "@/app/actions/availability";
import { updateBreakTime } from "@/app/actions/availability";

const breakDescription = [
  {
    id: 1,
    message: "Creates new event on my calendar",
  },
  {
    id: 2,
    message: "Block this time on my calendar",
  },

  {
    id: 3,
    message: "Adjust automatically if there’s a conflict",
  },
  {
    id: 4,
    message: "Repeat daily",
  },
];

export default function BreakSection({
  availableDay,
}: {
  availableDay: DoctorAvailability;
}) {
  const timeSlots = generateTimeSlots();
  const [breakState, setBreakState] = useState(
    availableDay.breakTimeStart ? true : false
  );
  const [selectedTime, setSelectedTime] = useState<any>({
    breakTimeStart: availableDay.breakTimeStart,
    breakTimeEnd: availableDay.breakTimeEnd,
  });

  const [isPending, startTransition] = useTransition();

  function handleBreakUpdate() {
    setBreakState((prev) => !prev);
    if (breakState) {
      setSelectedTime({
        breakTimeStart: null,
        breakTimeEnd: null,
      });
    }
  }

  async function handleTimeUpdate(type: string, time: string) {
    const newTimes = { ...selectedTime, [type]: time };

    if (newTimes.breakTimeStart && newTimes.breakTimeEnd) {
      const isValid = validateTime(
        formatWorkCardDate(newTimes.breakTimeStart),
        formatWorkCardDate(newTimes.breakTimeEnd)
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
        await updateBreakTime(newTimes.breakTimeStart, newTimes.breakTimeEnd);
      });
    }
    setSelectedTime(newTimes);
  }

  useEffect(() => {
    startTransition(async () => {
      await handleCreateBreakTime(breakState);
    });
    startTransition(async () => {});
  }, [selectedTime]);

  return (
    <div className="mb-10">
      <h1 className="text-lg font-bold">Break Time</h1>
      <div className="breakContent flex items-center justify-between mt-1 ">
        <div className="flex items-center gap-2">
          <p className="text-[var(--text-soft)]">
            I would like to take a break from
          </p>
          <Select
            value={formatWorkCardDate(selectedTime.breakTimeStart)}
            onValueChange={(v) => handleTimeUpdate("breakTimeStart", v)}
          >
            <SelectTrigger disabled={!breakState} className="w-[105px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent side="bottom" className="max-h-[200px]">
              {timeSlots.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-[var(--text-soft)]">to</p>
          <Select
            value={formatWorkCardDate(selectedTime.breakTimeEnd)}
            onValueChange={(v) => handleTimeUpdate("breakTimeEnd", v)}
          >
            <SelectTrigger disabled={!breakState} className="w-[105px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent side="bottom" className="max-h-[200px]">
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
        <Switch checked={breakState} onCheckedChange={handleBreakUpdate} />
      </div>
      <div className="line"></div>
      <div className="breakDescription mt-1">
        {breakDescription.map((item, index) => (
          <div className="flex items-center gap-2 my-3" key={item.id}>
            <Check color={"var(--btn-primary)"} />
            <p key={index} className="text-[var(--text-soft)]">
              {item.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
