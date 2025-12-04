import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Appointment } from "@prisma/client";
import EditableField from "../../patient/_components/EditableField";

import { AppointmentDateSelector } from "./AppointmentDateSelector";
import TimeSelector from "./TimeSelector";
import combineDateWithTime from "@/lib/dateFormats/BindDateAndTime";

export default function CreateAppointmentApp() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    formState: { errors },
  } = useForm<Appointment>();
  const isEditing = true;
  const [timeValue, setTimeValue] = useState("6:00AM");
  const dateValue = watch("date");

  function handleDataSubmit(data: Appointment) {
    if (!data.date && !timeValue) {
      return setError("date", {
        type: "manual",
        message: "Please select a date and time",
      });
    }

    data.date = combineDateWithTime(data.date, timeValue);

    console.log(data);
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
                  value={field.value || null}
                  onDateChange={field.onChange}
                />
              </div>
            )}
          />
          <TimeSelector
            disabled={!dateValue}
            value={timeValue}
            onValueChange={setTimeValue}
          />
        </div>
        <EditableField
          label="Reason"
          name="reason"
          inputData={null}
          isEditing={isEditing}
          register={register}
          errors={errors}
        />

        <div className=" flex-centermt-3">
          <button>Back</button>
          <button type="submit" className="primaryBtn px-7 ">
            Next
          </button>
        </div>
      </form>
    </section>
  );
}
