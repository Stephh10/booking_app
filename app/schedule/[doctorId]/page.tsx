"use client";

import React, { useEffect } from "react";
import ScheduleDatePicker from "./_components/ScheduleDatePicker";
import AvailableDateCard from "./_components/AvailableDateCard";
import Link from "next/link";
import { useState } from "react";
import { useTransition } from "react";
import { getDoctorAvailability } from "@/app/actions/availability";

interface FreeSlot {
  dayOfWeek: number;
  startTime: Date;
  endTime: Date;
}

export default function page() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [availableDates, setAvailableDates] = useState<FreeSlot[] | undefined>(
    undefined
  );
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (selectedDate) {
      startTransition(async () => {
        const result = await getDoctorAvailability(selectedDate);
        setAvailableDates(result);
      });
    }
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
                <AvailableDateCard key={index} dateData={data} />
              ))}
            </div>
          </div>
          <div className="scheduleInputSection mt-4 px-6">
            <div className="inputControl">
              <input
                type="text"
                name=""
                placeholder="First Name and Last Name"
              />
            </div>
            <div className="inputSection">
              <div className="inputControl">
                <input type="email" name="" placeholder="Email" />
              </div>
              <div className="inputControl">
                <input type="number" name="" placeholder="Phone" />
              </div>
            </div>
            <div className="inputControl">
              <textarea name="" id="" rows={5} placeholder="Message"></textarea>
            </div>
            <button className="h-[40px] bg-[var(--btn-primary)] text-[var(--text)] w-full mb-3 rounded-xl cursor-pointer">
              Confirm Appointment
            </button>
          </div>
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
