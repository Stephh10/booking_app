import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Appointment } from "@prisma/client";
import EditableField from "../../patient/_components/EditableField";
import { generateTimeSlots } from "@/lib/dateFormats/generateTimeSlots";
import { AppointmentDateSelector } from "../AppointmentDateSelector";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-dropdown-menu";

export default function CreateAppointmentApp() {
  const timeSlots = generateTimeSlots();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Appointment>();
  const isEditing = true;

  function handleDataSubmit(data: Appointment) {
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
          <div className="flex-1">
            <Label>Time</Label>
            <Select value={"6:00AM"}>
              <SelectTrigger className="w-full shadow-none bg-[var(--card)]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {timeSlots.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
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
