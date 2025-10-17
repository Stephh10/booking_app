"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { useTransition } from "react";
import { getDoctorAvailability } from "@/app/actions/availability";

import ScheduleDatePicker from "./ScheduleDatePicker";
import AvailableDateCard from "./AvailableDateCard";
import ScheduleForm from "./ScheduleForm";
import ScheduleFooter from "./ScheduleFooter";
import { SquareUser, GraduationCap } from "lucide-react";

interface FreeSlot {
  dayOfWeek: number;
  startTime: Date;
  endTime: Date;
}

export default function ScheduleMain() {
  //selectedDate from ScheduleDatePicker
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [timeCard, setTimeCard] = useState<Date | null>(null);
  //availableDates from db
  const [availableDates, setAvailableDates] = useState<FreeSlot[] | undefined>(
    undefined
  );
  //selected date functionality
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (selectedDate) {
      startTransition(async () => {
        const result = await getDoctorAvailability(selectedDate);
        setAvailableDates(result);
      });
    }

    setActiveIndex(null);
  }, [selectedDate]);

  return (
    <div className="container min-h-screen">
      <h1 className="text-xl font-bold py-2">AppDoc</h1>
      <div className="sheduleContainer max-w-[790px] mx-auto -mt-1">
        <div className="mb-2">
          <h2 className="text-2xl font-bold flex gap-2 items-center">
            <SquareUser size={30} />
            Dr. Kevin Johnson
          </h2>
          <div className="flex gap-2 items-center">
            <GraduationCap size={30} />
            <h2 className="text-xl font-bold  text-[var(--btn-primary)] ">
              Cardiology
            </h2>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold">
            Browse the available time slots and choose the one that works best
            for you
          </h2>
        </div>
        <div className="scheduleMainWrapper bg-[var(--bg)]">
          <div className="scheduleMain max-h-[420px]">
            <div className="flex-1">
              <ScheduleDatePicker
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            </div>
            <div className="mainRight flex-1 px-3 overflow-y-scroll">
              {availableDates?.map((data, index) => (
                <AvailableDateCard
                  key={index}
                  dateData={data}
                  isActive={activeIndex === index}
                  onClick={(dateData: any) => (
                    setActiveIndex(index), setTimeCard(dateData)
                  )}
                />
              ))}
            </div>
          </div>
          <ScheduleForm selectedTime={timeCard} />
        </div>
        <ScheduleFooter />
      </div>
    </div>
  );
}
