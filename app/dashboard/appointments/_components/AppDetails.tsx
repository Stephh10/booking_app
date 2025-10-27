"use client";

import React from "react";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { useTransition } from "react";
import { formatDate } from "@/lib/formatDate";
import { updateSelectedAppointment } from "@/app/actions/appointments";
import DateSelector from "@/components/DateSelector";
import { Appointment } from "@prisma/client";
import EditableField from "../../patient/_components/EditableField";
import { useForm } from "react-hook-form";

export default function AppDetails({
  appointmentData,
}: {
  appointmentData: Appointment;
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Appointment>();

  const [selectedDate, setSelectedDate] = useState(appointmentData.date);
  const [isPending, startTransition] = useTransition();

  const [isEditing, setIsEditing] = useState(false);

  const { id, diagnose, duration, date, reason, status, updatedAt } =
    appointmentData;

  function handleFormSubmit(data: Appointment) {
    startTransition(async () => {
      const response = await updateSelectedAppointment(appointmentData.id, {
        ...data,
        date: selectedDate ? selectedDate.toISOString() : undefined,
        duration: Number(data.duration),
      });
      if ("error" in response) {
        console.log("Something went wrong");
        console.log(response);
      }

      setIsEditing(false);
    });
    console.log({
      ...data,
      date: selectedDate ? selectedDate.toISOString() : undefined,
    });
  }
  return (
    <div className="relative ">
      <form className="w-[450px]" onSubmit={handleSubmit(handleFormSubmit)}>
        <h2 className="absolute top-0 right-0 bg-[var(--btn-primary)] text-[var(--text)] rounded-lg px-4 py-1 capitalize">
          {appointmentData.status}
        </h2>
        <EditableField
          label="Reason"
          name="reason"
          inputData={reason}
          isEditing={isEditing}
          register={register}
          errors={errors}
        />
        <EditableField
          label="Diagnose"
          name="diagnose"
          inputData={diagnose}
          isEditing={isEditing}
          register={register}
          errors={errors}
        />
        <div className="inputSection">
          <div className="flex flex-1 flex-col mb-4">
            <Label>Date and Time</Label>
            {isEditing ? (
              <DateSelector
                selectedDateTime={selectedDate}
                setSelectedDateTime={setSelectedDate}
              />
            ) : (
              <h2 className="formText">{formatDate(date)}</h2>
            )}
          </div>
          <EditableField
            label="Duration (Minutes)"
            name="duration"
            inputData={duration}
            isEditing={isEditing}
            register={register}
            errors={errors}
          />
        </div>
        <button
          type="button"
          onClick={() => setIsEditing(!isEditing)}
          className="p2"
        >
          Edit
        </button>
        <button
          type="submit"
          onClick={() => setIsEditing(!isEditing)}
          className="primaryBtn"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
