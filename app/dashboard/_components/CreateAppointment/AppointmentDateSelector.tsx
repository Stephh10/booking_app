"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect } from "react";
import { useTransition } from "react";
import { getDoctorAvailability } from "@/app/actions/availability";
import getAvailableTimes from "./getAvailableTimes";

interface CalendarProps {
  setAvailableDates: React.Dispatch<React.SetStateAction<string[] | null>>;
  onDateChange?: (date: Date | undefined) => void;
  value?: Date | null;
}

export function AppointmentDateSelector({
  setAvailableDates,
  onDateChange,
  value,
}: CalendarProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(value || undefined);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setDate(value || undefined);
    if (date) {
      startTransition(async () => {
        const response = await getDoctorAvailability(date);
        const data = getAvailableTimes(response);
        setAvailableDates(data);
      });
    }
  }, [date]);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setOpen(false);
    onDateChange?.(selectedDate);
  };

  return (
    <div className="flex flex-col gap-1 ">
      <Label htmlFor="date" className=" mt-0.5 !font-normal">
        Appointment Date
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full border-1 border-neutral-400 shadow-none justify-between font-normal bg-[var(--card)] hover:bg-[var(--card)]"
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className=" overflow-hidden p-0 w-full" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={handleDateSelect}
            disabled={(currentDate) => {
              return currentDate < new Date(new Date().setHours(0, 0, 0, 0));
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
