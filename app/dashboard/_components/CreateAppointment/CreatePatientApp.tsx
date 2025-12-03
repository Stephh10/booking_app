import React from "react";

import EditableField from "../../patient/_components/EditableField";
import { Controller, useForm } from "react-hook-form";
import { useAddAppointment } from "@/store/appointmentModal/useAddAppointment";
import { useAddPatient } from "@/store/appointmentModal/useAddPatient";
import { Patient } from "@prisma/client";
import { DateOfBirth } from "./DateOfBirth";

export default function CreatePatientApp() {
  const { step, changeStep } = useAddAppointment();
  const { patientData, savePatientData } = useAddPatient();
  const isEditing = true;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Patient>();

  function handlePatientSubmit(data: Patient) {
    if (!data) return;
    changeStep(step + 1);
    savePatientData(data);
  }

  return (
    <section>
      <h1 className="text-xl mt-2 mb-4">PatientDetails</h1>
      <form onSubmit={handleSubmit(handlePatientSubmit)}>
        <div className="inputSection">
          <EditableField
            label="First Name"
            name="firstName"
            inputData={patientData?.firstName || null}
            isEditing={isEditing}
            register={register}
            errors={errors}
            validation={{ required: "First Name is required" }}
          />
          <EditableField
            label="Last Name"
            name="lastName"
            inputData={patientData?.lastName || null}
            isEditing={isEditing}
            register={register}
            errors={errors}
            validation={{ required: "Last Name is required" }}
          />
        </div>
        <EditableField
          label="Email"
          name="email"
          inputData={patientData?.email || null}
          isEditing={isEditing}
          register={register}
          errors={errors}
          validation={{ required: "Email is required" }}
        />
        <EditableField
          label="Phone Number"
          name="phone"
          inputData={patientData?.phone || null}
          isEditing={isEditing}
          register={register}
          errors={errors}
        />
        <div className="inputSection">
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field }) => (
              <div className="flex-1">
                <DateOfBirth
                  value={field.value || patientData?.dateOfBirth || null}
                  onDateChange={field.onChange}
                />
              </div>
            )}
          />

          <EditableField
            label="Gender"
            name="gender"
            inputData={patientData?.gender || null}
            isEditing={isEditing}
            register={register}
            errors={errors}
          />
        </div>
        <div className="inputSection">
          <EditableField
            label="City"
            name="city"
            inputData={patientData?.city || null}
            isEditing={isEditing}
            register={register}
            errors={errors}
          />
          <EditableField
            label="Postal Code"
            name="postalCode"
            inputData={patientData?.postalCode || null}
            isEditing={isEditing}
            register={register}
            errors={errors}
          />
        </div>

        <button type="submit" className="primaryBtn px-7 mt-3">
          Next
        </button>
      </form>
    </section>
  );
}
