"use client";

import React from "react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

export default function ScheduleForm({
  selectedTime,
}: {
  selectedTime: Date | null;
}) {
  const [isPending, startTransition] = useTransition();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  function newAppointmentSubmit(data: any) {
    const formatedData = {
      date: selectedTime,
      duration: 30,
      ...data,
    };

    console.log(formatedData);
    startTransition(() => {});
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
        className="h-[40px] bg-[var(--btn-primary)] text-[var(--text)] w-full mb-3 rounded-xl cursor-pointer"
      >
        Confirm Appointment
      </button>
    </form>
  );
}
