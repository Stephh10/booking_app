"use client";
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";

export default function ScheduleDatePicker() {
  const [date, setDate] = useState<Date | undefined>(new Date());
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
