"use client";

import React from "react";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check } from "lucide-react";
import { generateTimeSlots } from "@/lib/dateFormats/generateTimeSlots";
import { useState, useTransition } from "react";
import { DoctorAvailability } from "@prisma/client";
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
  const [isPending, startTransition] = useTransition();
  const [breakState, setBreakState] = useState(
    availableDay?.breakTimeEnd ? true : false
  );

  function handleBreakUpdate() {
    setBreakState((prev) => !prev);

    startTransition(async () => {
      await updateBreakTime();
    });
  }
  return (
    <div className="mb-10">
      <h1 className="text-lg font-bold">Break Time</h1>
      <div className="breakContent flex items-center justify-between mt-1 ">
        <div className="flex items-center gap-2">
          <p className="text-[var(--text-soft)]">
            I would like to take a break from
          </p>
          <Select>
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
          <Select>
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
