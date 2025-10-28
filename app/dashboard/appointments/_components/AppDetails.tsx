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
import { useEditAppountmentState } from "@/store/useEditAppountmentState";

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

  const [isPending, startTransition] = useTransition();

  //date state
  const [selectedDate, setSelectedDate] = useState(appointmentData.date);

  const {
    isEditingAppointment: isEditing,
    setIsEditingAppointment: setIsEditing,
  } = useEditAppountmentState();

  const { diagnose, duration, date, reason, status } = appointmentData;

  function handleFormSubmit(data: Appointment) {
    startTransition(async () => {
      const response = await updateSelectedAppointment(appointmentData.id, {
        ...data,
        date: selectedDate ? selectedDate.toISOString() : undefined,
        duration: Number(data.duration),
      });
      if ("error" in response) {
        console.log(response);
        return;
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
        <h2 className="absolute top-0 right-0 bg-[var(--btn-primary)] text-[var(--text)] rounded-lg px-4 py-2 text-center capitalize">
          {status}
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

        <div className="appDetailsAction flex justify-between">
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="p2"
          >
            Edit
          </button>
          {isEditing && (
            <button
              type="submit"
              onClick={() => setIsEditing(!isEditing)}
              className="primaryBtn px-7"
            >
              Save
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
