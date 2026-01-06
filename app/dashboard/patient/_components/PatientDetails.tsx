"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InputDateSelector } from "@/components/InputDateSelector";
import { useEditPatientState } from "@/store/useEditPatientState";
import EditableField from "./EditableField";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { PatientDataForm } from "@/types/patientDataForm";
import { useTransition } from "react";
import { Patient } from "@prisma/client";
import { updateSelectedPatient } from "@/app/actions/patients";
import { formatBirthDate } from "@/lib/formatBirthDate";
import { toast } from "react-toastify";

export default function PatientDetails({
  patientData,
}: {
  patientData: Patient;
}) {
  const { isEditing, setIsEditing } = useEditPatientState();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PatientDataForm>();

  const [isPending, startTransition] = useTransition();

  const {
    id,
    firstName,
    lastName,
    gender,
    dateOfBirth,
    nationalId,
    email,
    city,
    phone,
    postalCode,
  } = patientData;

  const defaultValue = "Add information";

  const formatedDateOfBirth = dateOfBirth
    ? formatBirthDate(dateOfBirth)
    : defaultValue;

  function handleFormSubmit(data: PatientDataForm) {
    startTransition(async () => {
      const patientData = {
        ...data,
        id,
      };
      const updatedPatient = await updateSelectedPatient(patientData);

      if ("error" in updatedPatient) {
        toast.error(updatedPatient.error);
      }

      setIsEditing(false);
    });
  }

  return (
    <form className="w-[450px]" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="inputSection">
        <EditableField
          label="First Name"
          name="firstName"
          inputData={firstName}
          isEditing={isEditing}
          register={register}
          errors={errors}
        />
        <EditableField
          label="Last Name"
          name="lastName"
          inputData={lastName}
          isEditing={isEditing}
          register={register}
          errors={errors}
        />
      </div>
      <div className="inputSection">
        <div className="inputControl">
          <label htmlFor="">Gender</label>
          {!isEditing ? (
            <h2 className="formText">{gender ?? defaultValue}</h2>
          ) : (
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full bg-[var(--background)]">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          )}
        </div>
        <div className="inputControl">
          <label htmlFor="">Date of birth</label>
          {!isEditing ? (
            <h2 className="formText">{formatedDateOfBirth}</h2>
          ) : (
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field }) => (
                <InputDateSelector
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          )}
        </div>
      </div>
      <EditableField
        label="National ID"
        name="nationalId"
        inputData={nationalId ?? defaultValue}
        isEditing={isEditing}
        register={register}
        errors={errors}
      />
      <EditableField
        label="Email"
        name="email"
        inputData={email ?? defaultValue}
        isEditing={isEditing}
        register={register}
        errors={errors}
      />
      <EditableField
        label="Phone"
        name="phone"
        inputData={phone ?? defaultValue}
        isEditing={isEditing}
        register={register}
        errors={errors}
      />
      <div className="inputSection">
        <EditableField
          label="City"
          name="city"
          inputData={city ?? defaultValue}
          isEditing={isEditing}
          register={register}
          errors={errors}
        />
        <EditableField
          label="Postal Code"
          name="postalCode"
          inputData={postalCode ?? defaultValue}
          isEditing={isEditing}
          register={register}
          errors={errors}
        />
      </div>
      {isEditing && (
        <div className="mt-4">
          <button
            disabled={isPending}
            className="primaryBtn w-[220px] ml-auto "
          >
            {isPending ? "Updating..." : "Update"}
          </button>
        </div>
      )}
    </form>
  );
}
