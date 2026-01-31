"use client";

import React from "react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { handleScheduleSubmit } from "@/app/actions/schedule";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Spinner } from "@/components/ui/spinner";
import { useDemoSchedule } from "@/store/useDemoSchedule";

export default function ScheduleForm({
  selectedTime,
  doctorId,
}: {
  selectedTime: Date | null;
  doctorId: string;
}) {
  const { setDemoSchedule } = useDemoSchedule();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  function newAppointmentSubmit(data: any) {
    const formatedData = {
      date: selectedTime,
      duration: 30,
      patientEmail: data.email,
      patientPhone: data.phone,
      reason: data.message,
      firstName: data.firstName,
      lastName: data.lastName,
    };

    startTransition(async () => {
      if (!selectedTime) {
        toast.error("Please select a time");
        return;
      }
      if (doctorId !== "test") {
        const response = await handleScheduleSubmit(formatedData, doctorId);

        if ("error" in response) return;
        router.push(`/appointment/scheduled/${response.id}`);
      } else {
        await sleep(2000);
        setDemoSchedule(selectedTime);
        router.push(`/demo/response`);
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit(newAppointmentSubmit)}
      className="scheduleInputSection mt-4 px-6"
    >
      <div className="inputSection">
        <div className="inputControl">
          <input
            type="text"
            {...register("firstName", { required: true })}
            placeholder="First Name"
            className={`w-full p-2 border rounded-md ${
              errors.firstName && "border-red-500"
            }`}
          />
        </div>
        <div className="inputControl">
          <input
            type="text"
            {...register("lastName", { required: true })}
            placeholder="Last Name"
            className={`w-full p-2 border rounded-md ${
              errors.lastName && "border-red-500"
            }`}
          />
        </div>
      </div>

      <div className="inputSection">
        <div className="inputControl">
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Email"
            className={`w-full p-2 border rounded-md ${
              errors.email && "border-red-500"
            }`}
          />
        </div>
        <div className="inputControl">
          <input
            type="number"
            {...register("phone", { required: true })}
            placeholder="Phone"
            className={`w-full p-2 border rounded-md ${
              errors.phone && "border-red-500"
            }`}
          />
        </div>
      </div>
      <div className="inputControl">
        <textarea
          {...register("message", { required: true })}
          rows={5}
          placeholder="Message"
          className={`w-full p-2 border rounded-md ${
            errors.message && "border-red-500"
          }`}
        ></textarea>
      </div>
      <button
        type="submit"
        className="h-[40px] bg-[var(--btn-primary)] text-[var(--text)] w-full mb-3 rounded-xl cursor-pointer block"
      >
        {isPending ? (
          <div className="flex justify-center">
            <Spinner className="size-6 text-center" />
          </div>
        ) : (
          "Confirm Appointment"
        )}
      </button>
    </form>
  );
}
