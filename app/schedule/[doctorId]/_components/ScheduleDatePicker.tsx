"use client";
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";

export default function ScheduleDatePicker({
  selectedDate: date,
  setSelectedDate: setDate,
}: {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="my-4 h-full w-full"
        captionLayout={"buttons" as any}
      />
    </div>
  );
}
