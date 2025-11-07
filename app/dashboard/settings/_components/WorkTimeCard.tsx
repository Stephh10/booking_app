"use client";
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Clock } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function WorkTimeCard() {
  const [activeDay, setActiveDay] = useState(true);

  return (
    <div className="workTimeCard border-2 p-2 rounded-lg">
      <div className="flex  items-center justify-between ">
        <div className="flex items-center gap-1">
          <Clock size={17} />
          <h1>Day and Time</h1>
        </div>
        <div className="flex items-center gap-2 text-[var(--text-soft)]">
          <p>{activeDay ? "Available" : " Not Available"}</p>
          <Switch checked={activeDay} onCheckedChange={setActiveDay} />
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
              <SelectValue placeholder="Monday" />
            </SelectTrigger>
          </Select>
        </div>
        <div className="workTimeCardSelector">
          <h1 className="flex-1">From</h1>
          <Select>
            <SelectTrigger disabled={!activeDay} className="flex-6">
              <SelectValue placeholder="English" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="en">English</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectItem disabled value="es">
                  German
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="workTimeCardSelector">
          <h1 className="flex-1">To</h1>
          <Select>
            <SelectTrigger disabled={!activeDay} className="flex-6">
              <SelectValue placeholder="English" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="en">English</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectItem disabled value="es">
                  German
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
