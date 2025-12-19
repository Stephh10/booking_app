"use client";

import React from "react";
import { useState } from "react";
import { useTransition } from "react";
import { formatDate } from "@/lib/formatDate";
import { updateSelectedAppointment } from "@/app/actions/appointments";
import { Appointment } from "@prisma/client";
import EditableField from "../../patient/_components/EditableField";
import { useForm } from "react-hook-form";
import { useEditAppountmentState } from "@/store/useEditAppountmentState";
import { useRouter } from "next/navigation";
import { Controller } from "react-hook-form";
import { AppointmentDateSelector } from "../../_components/CreateAppointment/AppointmentDateSelector";
import TimeSelector from "../../_components/CreateAppointment/TimeSelector";
import { formatWorkCardDate } from "@/lib/dateFormats/formatWorkCardDate";
import { toast } from "react-toastify";
import combineDateWithTime from "@/lib/dateFormats/BindDateAndTime";
import { Spinner } from "@/components/ui/spinner";
import clsx from "clsx";
import { SelectInput } from "@/components/SelectInput";
import { Label } from "@/components/ui/label";

export default function AppDetails({
  appointmentData,
}: {
  appointmentData: Appointment;
}) {
  const {
    register,
    handleSubmit,
    control,
    setError,
    watch,
    formState: { errors },
  } = useForm<Appointment>();

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  //date state
  const [availableDates, setAvailableDates] = useState<string[] | null>(null);

  const {
    isEditingAppointment: isEditing,
    setIsEditingAppointment: setIsEditing,
  } = useEditAppountmentState();

  const { diagnose, duration, date, reason, status } = appointmentData;

  function handleDataSubmit(data: Appointment) {
    if (appointmentData?.date && appointmentData.time) {
      return toast.error("Please select a date and time");
    } else {
      if (!data.date || !data.time) {
        return setError("date", {
          type: "manual",
          message: "Please select a date and time",
        });
      }

      data.date = combineDateWithTime(data.date, formatWorkCardDate(data.time));

      startTransition(async () => {
        const response = await updateSelectedAppointment(appointmentData.id, {
          ...data,
          time: null,
          duration: Number(data.duration),
        });

        if ("error" in response) {
          toast.error(response.error);
          return;
        }
      });

      return setIsEditing(false);
    }
  }

  return (
    <div className="relative ">
      <form
        className="w-full flex gap-5"
        onSubmit={handleSubmit(handleDataSubmit)}
      >
        <div className="flex-1">
          {/* <div
            className={`absolute top-0 right-0 text-[var(--text)] rounded-lg px-4 py-2 text-center capitalize ${
              status !== "scheduled"
                ? "border-2 text-[var(--text-soft)]"
                : "bg-[var(--btn-primary)]"
            }`}
          >
            {status}
          </div> */}
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
          <div className="inputSection flex items-center mb-1">
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <div className="flex-1">
                  {isEditing ? (
                    <div>
                      <AppointmentDateSelector
                        value={field.value || date}
                        onDateChange={field.onChange}
                        setAvailableDates={setAvailableDates}
                      />
                    </div>
                  ) : (
                    <div>
                      <h2>Date</h2>
                      <p className="text-[var(--text-soft)]">
                        {formatDate(appointmentData?.date || "")}
                      </p>
                    </div>
                  )}

                  {errors.date && (
                    <p className="text-red-500 text-sm mb-1">
                      {errors.date.message}
                    </p>
                  )}
                </div>
              )}
            />
            <div className="flex-1 mt-[2px]">
              <Controller
                name="time"
                control={control}
                render={({ field }) =>
                  isEditing ? (
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
                  ) : (
                    <h2></h2>
                  )
                }
              />
            </div>
          </div>
          <div className="inputSection">
            <EditableField
              label="Duration (Minutes)"
              name="duration"
              inputData={duration}
              isEditing={isEditing}
              register={register}
              errors={errors}
            />
            <EditableField
              label="Duration (Minutes)"
              name="duration"
              inputData={duration}
              isEditing={isEditing}
              register={register}
              errors={errors}
            />
          </div>

          <div className="inputSection">
            <div className="flex-1">
              <Label className="text-md font-normal">Appointment Type</Label>
              {isEditing ? (
                <SelectInput
                  name="appointmentType"
                  control={control}
                  componentProps={{
                    placeholder: "",
                    options: [
                      { value: "first_visit", label: "Schedule" },
                      { value: "follow_up", label: "Cancel" },
                      { value: "emergency", label: "Emergency" },
                    ],
                  }}
                />
              ) : (
                <p>{appointmentData?.appointmentType}</p>
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

          <div className="appDetailsAction flex justify-between mt-4">
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="outlineBtn border-1"
            >
              Go Back
            </button>
            {isEditing && (
              <button
                disabled={isPending}
                type="submit"
                className={clsx(
                  "primaryBtn px-7",
                  isPending && "pointer-events-none"
                )}
              >
                {isPending ? <Spinner className="size-6" /> : "Save"}
              </button>
            )}
          </div>
        </div>
        <div className="flex-1">
          <h2>Second part</h2>
        </div>
      </form>
    </div>
  );
}
