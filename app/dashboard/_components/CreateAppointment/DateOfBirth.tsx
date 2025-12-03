// Calendar22.tsx
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

interface Calendar22Props {
  onDateChange?: (date: Date | undefined) => void;
  value?: Date | null;
}

export function DateOfBirth({ onDateChange, value }: Calendar22Props) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(value || undefined);

  useEffect(() => {
    setDate(value || undefined);
  }, [value]);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setOpen(false);
    onDateChange?.(selectedDate);
  };

  return (
    <div className="flex flex-col gap-1 ">
      <Label htmlFor="date" className=" mt-0.5 !font-normal">
        Date of birth
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full border-1 shadow-none justify-between font-normal bg-[var(--card)]"
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
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
