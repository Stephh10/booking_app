"use client";

import * as React from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import { ChevronDownIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerProps = {
  date?: Date;
  setDate: (date: Date | undefined) => void;
  placeholder?: string;
};

export function DatePicker({
  date,
  setDate,
  placeholder = "Select Date",
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [timeValue, setTimeValue] = useState("10:30:00");
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  function combineDates(selectedDate: Date | undefined) {
    if (!selectedDate) return;

    const [hours, minutes, seconds] = timeValue.split(":").map(Number);

    const combinedDate = new Date(selectedDate);
    combinedDate.setHours(hours, minutes, seconds);

    return combinedDate;
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeValue(e.target.value);
    if (date) {
      const newDate = combineDates(date);
      if (newDate) setDate(newDate);
    }
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const newDate = combineDates(selectedDate);
      setDate(newDate);
    } else {
      setDate(undefined);
    }
    setOpen(false);
  };

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        <Label htmlFor="date-picker" className="px-1">
          Date
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="w-32 justify-between font-normal"
            >
              {date ? format(date, "MM/dd/yyyy") : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={handleDateSelect}
              disabled={(date: Date) => date.getTime() < startOfToday.getTime()}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="time-picker" className="px-1">
          Time
        </Label>
        <Input
          type="time"
          id="time-picker"
          step="1"
          value={timeValue}
          onChange={handleTimeChange}
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  );
}
