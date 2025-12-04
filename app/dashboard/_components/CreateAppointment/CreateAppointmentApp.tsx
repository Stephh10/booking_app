import React from "react";
import { useForm } from "react-hook-form";
import { Appointment } from "@prisma/client";
import EditableField from "../../patient/_components/EditableField";

export default function CreateAppointmentApp() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Appointment>();
  const isEditing = true;

  return (
    <section>
      <h1 className="text-xl mt-2 mb-4">Appointment Details</h1>
      <form action="">
        <EditableField
          label="Reason"
          name="reason"
          inputData={null}
          isEditing={isEditing}
          register={register}
          errors={errors}
        />
        <EditableField
          label="Diagnose"
          name="diagnose"
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
