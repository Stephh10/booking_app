"use client";
import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditPatientState } from "@/store/useEditPatientState";
import { useForm } from "react-hook-form";
import EditableField from "./EditableField";
import { Controller } from "react-hook-form";
import { MedicalDetails } from "@prisma/client";

export default function PatientMedicalDetails({
  patientMedData,
}: {
  patientMedData: MedicalDetails;
}) {
  const {
    diagnosis,
    medications,
    familyHistory,
    bloodType,
    chronicDiseases,
    bloodPressure,
    heartRate,
    weight,
    height,
    allergies,
    surgeries,
  } = patientMedData;
  const defaultValue = "Add information";

  const { isEditing } = useEditPatientState();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<MedicalDetails>();

  function handleMedDetailsSubmit(data: MedicalDetails) {
    console.log(data);
  }

  return (
    <form className="w-[450px]" onSubmit={handleSubmit(handleMedDetailsSubmit)}>
      <EditableField
        label="Diagnosis"
        name="diagnosis"
        inputData={diagnosis ?? defaultValue}
        isEditing={isEditing}
        register={register}
        errors={errors}
      />
      <EditableField
        label="Medications"
        name="medications"
        inputData={medications ?? defaultValue}
        isEditing={isEditing}
        register={register}
        errors={errors}
      />
      <EditableField
        label="Family History"
        name="familyHistory"
        inputData={familyHistory ?? defaultValue}
        isEditing={isEditing}
        register={register}
        errors={errors}
      />
      <div className="inputSection">
        <div className="inputControl">
          <label htmlFor="">BloodType</label>
          {!isEditing ? (
            <h2 className="formText">{bloodType ?? defaultValue}</h2>
          ) : (
            <Controller
              name="bloodType"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? undefined}
                >
                  <SelectTrigger className="w-full bg-[var(--background)]">
                    <SelectValue
                      placeholder="Blood Type"
                      className="text-[var(--text-soft)]"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          )}
        </div>
        <EditableField
          label="Chronic Diseases"
          name="chronicDiseases"
          inputData={chronicDiseases ?? defaultValue}
          isEditing={isEditing}
          register={register}
          errors={errors}
        />
      </div>
      <div className="inputSection">
        <EditableField
          label="Blood Pressure"
          name="bloodPressure"
          inputData={bloodPressure ?? defaultValue}
          isEditing={isEditing}
          register={register}
          errors={errors}
        />
        <EditableField
          label="Heart Rate"
          name="heartRate"
          inputData={heartRate ?? defaultValue}
          isEditing={isEditing}
          register={register}
          errors={errors}
        />
      </div>

      <div className="inputSection">
        <EditableField
          label="Weight"
          name="weight"
          inputData={weight ?? defaultValue}
          isEditing={isEditing}
          register={register}
          errors={errors}
        />
        <EditableField
          label="Height"
          name="height"
          inputData={height ?? defaultValue}
          isEditing={isEditing}
          register={register}
          errors={errors}
        />
      </div>
      <div className="inputSection">
        <EditableField
          label="Allergies"
          name="allergies"
          inputData={allergies ?? defaultValue}
          isEditing={isEditing}
          register={register}
          errors={errors}
        />
        <EditableField
          label="Surgeries"
          name="surgeries"
          inputData={surgeries ?? defaultValue}
          isEditing={isEditing}
          register={register}
          errors={errors}
        />
      </div>
      {isEditing && (
        <div className="mt-4">
          <button className="primaryBtn w-[220px] ml-auto ">Update</button>
        </div>
      )}
    </form>
  );
}
