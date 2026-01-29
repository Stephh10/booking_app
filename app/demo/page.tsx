"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { useTransition } from "react";
import ScheduleFooter from "../schedule/[doctorId]/_components/ScheduleFooter";
import ScheduleForm from "../schedule/[doctorId]/_components/ScheduleForm";
import AvailableDateCard from "../schedule/[doctorId]/_components/AvailableDateCard";
import ScheduleDatePicker from "../schedule/[doctorId]/_components/ScheduleDatePicker";
import { SquareUser, GraduationCap } from "lucide-react";
import Link from "next/link";
import { useThemeState } from "@/store/useTheme";
import { getDemoAvailability } from "@/app/actions/availability";

interface FreeSlot {
  dayOfWeek: number;
  startTime: Date;
  endTime: Date;
}

export default function page() {
  //selectedDate from ScheduleDatePicker
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [timeCard, setTimeCard] = useState<Date | null>(null);
  //availableDates from db
  const [availableDates, setAvailableDates] = useState<FreeSlot[] | undefined>(
    undefined,
  );
  //selected date functionality
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const { theme } = useThemeState();

  useEffect(() => {
    if (selectedDate) {
      startTransition(async () => {
        const result = await getDemoAvailability(selectedDate);
        setAvailableDates(result);
      });
    }

    setActiveIndex(null);
  }, [selectedDate]);

  return (
    <div className="container min-h-screen">
      <div className="relative w-[200px] h-[50px] flex items-center -ml-9">
        <Link href={"/"} className="cursor-pointer">
          <img
            className="h-full w-auto object-contain"
            src={theme === "light" ? "/logo.png" : "/logo-light.png"}
            alt="logo"
          />
        </Link>
      </div>
      <div className="sheduleContainer max-w-[790px] mx-auto -mt-1">
        <div className="mb-2">
          <h2 className="text-2xl font-bold flex gap-2 items-center">
            <SquareUser size={30} />
            Dr. Michael Berger
          </h2>
          <div className="flex gap-2 items-center">
            <GraduationCap size={30} />
            <h2 className="text-xl font-bold  text-[var(--btn-primary)] ">
              General Medicine
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
            <div className="mainRight flex-1 px-3 overflow-y-scroll h-[420px]">
              {availableDates?.length ? (
                availableDates?.map((data, index) => (
                  <AvailableDateCard
                    key={index}
                    dateData={data}
                    isActive={activeIndex === index}
                    onClick={(dateData: any) => (
                      setActiveIndex(index),
                      setTimeCard(dateData)
                    )}
                  />
                ))
              ) : (
                <div className="h-full flex items-center justify-center">
                  <h2 className="text-xl text-[var(--text-soft)]">
                    {" "}
                    Please select another date...
                  </h2>
                </div>
              )}
            </div>
          </div>
          <ScheduleForm doctorId={"test"} selectedTime={timeCard} />
        </div>
        <ScheduleFooter />
      </div>
    </div>
  );
}
