"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { useTransition } from "react";
import { getDoctorAvailability } from "@/app/actions/availability";

import ScheduleDatePicker from "./ScheduleDatePicker";
import AvailableDateCard from "./AvailableDateCard";
import ScheduleForm from "./ScheduleForm";
import ScheduleFooter from "./ScheduleFooter";
import { SquareUser } from "lucide-react";
import { getUser } from "@/app/actions/user";
import Link from "next/link";
import { useThemeState } from "@/store/useTheme";
import Image from "next/image";
import { Globe, Hospital } from "lucide-react";

interface FreeSlot {
  dayOfWeek: number;
  startTime: Date;
  endTime: Date;
}

type UserPlanType = Awaited<ReturnType<typeof getUser>>;

export default function ScheduleMain({ doctorId }: { doctorId: string }) {
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

  const [doctorData, setDoctorData] = useState<UserPlanType | null>();

  const { theme } = useThemeState();

  useEffect(() => {
    if (selectedDate) {
      startTransition(async () => {
        const result = await getDoctorAvailability(selectedDate);
        setAvailableDates(result);
      });
    }

    const userResponse = getUser(doctorId);
    userResponse.then((data) => {
      setDoctorData(data);
    });

    setActiveIndex(null);
  }, [selectedDate]);

  console.log(doctorData);

  return (
    <div className="container">
      {doctorData && !("error" in doctorData) && (
        <div className="relative max-w-[950px] mx-auto">
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
            <div className="flex-2 bg-[var(--bg)] rounded-lg px-2">
              <div className="relative w-[200px] h-[200px] rounded-full border mx-auto mt-12 overflow-hidden mb-2">
                <Image
                  src={
                    doctorData?.profileImage
                      ? doctorData.profileImage.url
                      : "/default-profile.png"
                  }
                  fill
                  alt="default_profile_image"
                />
              </div>
              <div className="mb-2 text-center">
                <h2 className="text-2xl font-bold">
                  Dr. {`${doctorData?.firstName} ${doctorData?.lastName}`}
                </h2>
                <h2 className="text-xl font-bold  text-[var(--btn-primary)] ">
                  {doctorData?.speciality?.trim()
                    ? doctorData.speciality
                    : "General Medicine"}
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
            <div className="scheduleMainWrapper bg-[var(--bg)] flex-5">
              <div className="scheduleMain max-h-[420px]">
                <div className="flex-1">
                  <ScheduleDatePicker
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                  />
                </div>
                <div className="mainRight flex-1 px-3 overflow-y-scroll h-[330px]">
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
                      <h2 className="text-xl text-center text-[var(--text-soft)]">
                        {" "}
                        Please choose a valid date to schedule your appointment
                      </h2>
                    </div>
                  )}
                </div>
              </div>
              <ScheduleForm doctorId={doctorId} selectedTime={timeCard} />
            </div>
          </div>
          <ScheduleFooter />
        </div>
      )}
    </div>
    // <div className="container min-h-screen">
    //   <div className="relative w-[200px] h-[50px] flex items-center -ml-9">
    //     <Link href={"/"} className="cursor-pointer">
    //       <img
    //         className="h-full w-auto object-contain"
    //         src={theme === "light" ? "/logo.png" : "/logo-light.png"}
    //         alt="logo"
    //       />
    //     </Link>
    //   </div>
    //   <div className="sheduleContainer max-w-[790px] mx-auto -mt-1">
    //     {doctorData && !("error" in doctorData) && (
    //       <div className="mb-2">
    //         <h2 className="text-2xl font-bold flex gap-2 items-center">
    //           <SquareUser size={30} />
    //           Dr. {`${doctorData?.firstName} ${doctorData?.lastName}`}
    //         </h2>
    //         <div className="flex gap-2 items-center">
    //           <GraduationCap size={30} />
    //           <h2 className="text-xl font-bold  text-[var(--btn-primary)] ">
    //             {doctorData?.speciality?.trim()
    //               ? doctorData.speciality
    //               : "General Medicine"}
    //           </h2>
    //         </div>
    //       </div>
    //     )}
    //     <div>
    //       <h2 className="text-xl font-bold">
    //         Browse the available time slots and choose the one that works best
    //         for you
    //       </h2>
    //     </div>
    //     <div className="scheduleMainWrapper bg-[var(--bg)]">
    //       <div className="scheduleMain max-h-[420px]">
    //         <div className="flex-1">
    //           <ScheduleDatePicker
    //             selectedDate={selectedDate}
    //             setSelectedDate={setSelectedDate}
    //           />
    //         </div>
    //         <div className="mainRight flex-1 px-3 overflow-y-scroll h-[420px]">
    //           {availableDates?.length ? (
    //             availableDates?.map((data, index) => (
    //               <AvailableDateCard
    //                 key={index}
    //                 dateData={data}
    //                 isActive={activeIndex === index}
    //                 onClick={(dateData: any) => (
    //                   setActiveIndex(index),
    //                   setTimeCard(dateData)
    //                 )}
    //               />
    //             ))
    //           ) : (
    //             <div className="h-full flex items-center justify-center">
    //               <h2 className="text-xl text-[var(--text-soft)]">
    //                 {" "}
    //                 Please select another date...
    //               </h2>
    //             </div>
    //           )}
    //         </div>
    //       </div>
    //       <ScheduleForm doctorId={doctorId} selectedTime={timeCard} />
    //     </div>
    //     <ScheduleFooter />
    //   </div>
    // </div>
  );
}
