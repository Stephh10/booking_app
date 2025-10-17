"use client";

import React, { useEffect } from "react";
import ScheduleDatePicker from "./_components/ScheduleDatePicker";
import AvailableDateCard from "./_components/AvailableDateCard";
import Link from "next/link";
import { useState } from "react";
import { useTransition } from "react";
import { getDoctorAvailability } from "@/app/actions/availability";
import ScheduleForm from "./_components/ScheduleForm";

interface FreeSlot {
  dayOfWeek: number;
  startTime: Date;
  endTime: Date;
}

export default async function page({
  params,
}: {
  params: { doctorId: string };
}) {
  const { doctorId } = await params;
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
    <div className="container h-screen">
      <h1 className="text-xl font-bold py-2">AppDoc</h1>
      <div className="sheduleContainer max-w-[790px] mx-auto">
        <div className="mb-2">
          <h2 className="text-2xl font-bold">Dr. Kevin Johnson</h2>
          <h2 className="text-[var(--btn-primary)] text-xl font-bold ">
            Cardiologists
          </h2>
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
        <div className="scheduleFooter">
          <Link href="/about">Terms of service</Link>
          <p>&copy; 2025 AppDoc</p>
          <Link href="/contact">Contact: 22 234 2312</Link>
        </div>
      </div>
    </div>
  );
}
