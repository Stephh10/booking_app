import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Appointment } from "@prisma/client";
import EditableField from "../../patient/_components/EditableField";
import { AppointmentDateSelector } from "./AppointmentDateSelector";
import TimeSelector from "./TimeSelector";
import combineDateWithTime from "@/lib/dateFormats/BindDateAndTime";
import { useAddAppointment } from "@/store/appointmentModal/useAddAppointment";
import { useAppointmentStep } from "@/store/appointmentModal/useAppointmentStep";
import { formatWorkCardDate } from "@/lib/dateFormats/formatWorkCardDate";

export default function CreateAppointmentApp() {
  const { appointmentData, saveAppointmentData } = useAddAppointment();
  const [availableDates, setAvailableDates] = useState<string[] | null>(null);
  const { step, changeStep, isEditing } = useAppointmentStep();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    formState: { errors },
  } = useForm<Appointment>();

  const date = watch("date");

  function handleDataSubmit(data: Appointment) {
    if (appointmentData?.date && appointmentData.time) {
      return changeStep(step + 1);
    } else {
      if (!data.date || !data.time) {
        return setError("date", {
          type: "manual",
          message: "Please select a date and time",
        });
      }

      data.date = combineDateWithTime(data.date, formatWorkCardDate(data.time));
      saveAppointmentData(data);

      return changeStep(step + 1);
    }
  }

  return (
    <section>
      <h1 className="text-xl mt-2 mb-4">Appointment Details</h1>
      <form onSubmit={handleSubmit(handleDataSubmit)}>
        <div className="inputSection">
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <div className="flex-1">
                <AppointmentDateSelector
                  value={field.value || appointmentData?.date}
                  onDateChange={field.onChange}
                  setAvailableDates={setAvailableDates}
                />
                {errors.date && (
                  <p className="text-red-500 text-sm mb-1">
                    {errors.date.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="time"
            control={control}
            render={({ field }) => (
              <TimeSelector
                disabled={!date && !appointmentData?.date}
                value={
                  appointmentData?.time
                    ? formatWorkCardDate(appointmentData?.time)
                    : field.value
                    ? formatWorkCardDate(field.value)
                    : null
                }
                onValueChange={field.onChange}
                availableDates={availableDates}
              />
            )}
          />
        </div>
        <EditableField
          label="Reason"
          name="reason"
          inputData={appointmentData?.reason || null}
          isEditing={isEditing}
          register={register}
          errors={errors}
        />
        <EditableField
          label="Diagnosis"
          name="diagnose"
          inputData={appointmentData?.diagnose || null}
          isEditing={isEditing}
          register={register}
          errors={errors}
        />
        <div className=" flex-centermt-3 flex gap-2 justify-end mt-4">
          <button
            onClick={() => changeStep(step - 1)}
            className="outlineBtn w-[100px]"
          >
            Back
          </button>
          <button type="submit" className="primaryBtn w-[100px]">
            Next
          </button>
        </div>
      </form>
    </section>
  );
}
