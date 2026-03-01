"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { useTransition } from "react";
import ScheduleFooter from "../schedule/[doctorId]/_components/ScheduleFooter";
import ScheduleForm from "../schedule/[doctorId]/_components/ScheduleForm";
import AvailableDateCard from "../schedule/[doctorId]/_components/AvailableDateCard";
import ScheduleDatePicker from "../schedule/[doctorId]/_components/ScheduleDatePicker";
import { SquareUser, Globe, Hospital } from "lucide-react";
import Link from "next/link";
import { useThemeState } from "@/store/useTheme";
import { getDemoAvailability } from "@/app/actions/availability";
import Image from "next/image";

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
    <div className="container">
      <div className="relative max-w-[900px] mx-auto">
        <div className="absolute w-[200px] h-[50px] flex items-center top-5 left-2 -ml-9">
          <Link href={"/"} className="cursor-pointer">
            <img
              className="h-full w-auto object-contain"
              src={theme === "light" ? "/logo.png" : "/logo-light.png"}
              alt="logo"
            />
          </Link>
        </div>
        <div className="flex gap-4 pt-4">
          {/* doctor container */}
          <div className="flex-2 bg-[var(--bg)] rounded-lg px-2 pb-5.5 flex flex-col">
            <div className="relative w-[200px] h-[200px] rounded-full border mx-auto mt-12 overflow-hidden mb-2">
              <Image
                src={"/default-profile.png"}
                fill
                alt="default_profile_image"
              />
            </div>
            <div className="mb-2 text-center">
              <h2 className="text-2xl font-bold">Dr. Michael Berger</h2>
              <h2 className="text-xl font-bold  text-[var(--btn-primary)] ">
                General Medicine
              </h2>
            </div>
            <div className="line"></div>
            <ul className="text-lg mt-2">
              <li className="flex gap-2 items-center my-1">
                <SquareUser size={20} />
                <p>+5 years of experience</p>
              </li>
              <li className="flex gap-2 items-center my-1">
                <Hospital size={20} />
                <p>St Hospital</p>
              </li>
              <li className="flex gap-2 items-center my-1">
                <Globe size={20} />
                <p>English, German</p>
              </li>
            </ul>
          </div>
          {/* schedule container */}
          <div className="scheduleMainWrapper bg-[var(--bg)] w-full">
            <div className="flex gap-4">
              <div className="flex-1 ">
                <ScheduleDatePicker
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              </div>
              <div className="flex-1 h-[400px] overflow-y-scroll ">
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
                    <p className="text-xl mx-3">Please select valid date</p>
                  </div>
                )}
              </div>
            </div>
            <ScheduleForm doctorId={"test"} selectedTime={timeCard} />
          </div>
        </div>
        <ScheduleFooter />
      </div>
    </div>
  );
}
