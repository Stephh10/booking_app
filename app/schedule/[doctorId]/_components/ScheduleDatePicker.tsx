"use client";
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";

export default function ScheduleDatePicker({
  selectedDate: date,
  setSelectedDate: setDate,
}: {
  selectedDate: Date | undefined;
  setSelectedDate: (date: any) => void;
}) {
  const [mounted, setMounted] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

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
        disabled={(date) => date < today}
        className="my-4 h-full w-full bg-inherit [&_td]:bg-inherit [&_th]:bg-inherit"
        captionLayout={"buttons" as any}
      />
    </div>
  );
}
