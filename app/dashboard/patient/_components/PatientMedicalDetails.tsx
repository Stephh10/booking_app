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

export default function PatientMedicalDetails() {
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
        inputData="Diabetes mellitus"
        isEditing={isEditing}
        register={register}
        errors={errors}
      />
      <EditableField
        label="Medications"
        name="medications"
        inputData="Apaurin"
        isEditing={isEditing}
        register={register}
        errors={errors}
      />
      <EditableField
        label="Family History"
        name="familyHistory"
        inputData="None"
        isEditing={isEditing}
        register={register}
        errors={errors}
      />
      <div className="inputSection">
        <div className="inputControl">
          <label htmlFor="">BloodType</label>
          {!isEditing ? (
            <h2 className="formText">AB</h2>
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
          inputData="None"
          isEditing={isEditing}
          register={register}
          errors={errors}
        />
      </div>
      <div className="inputSection">
        <EditableField
          label="Blood Pressure"
          name="bloodPressure"
          inputData="120/142"
          isEditing={isEditing}
          register={register}
          errors={errors}
        />
        <EditableField
          label="Heart Rate"
          name="heartRate"
          inputData="72"
          isEditing={isEditing}
          register={register}
          errors={errors}
        />
      </div>

      <div className="inputSection">
        <EditableField
          label="Weight"
          name="weight"
          inputData="78kg"
          isEditing={isEditing}
          register={register}
          errors={errors}
        />
        <EditableField
          label="Height"
          name="height"
          inputData="182cm"
          isEditing={isEditing}
          register={register}
          errors={errors}
        />
      </div>
      <div className="inputSection">
        <EditableField
          label="Allergies"
          name="allergies"
          inputData="None"
          isEditing={isEditing}
          register={register}
          errors={errors}
        />
        <EditableField
          label="Surgeries"
          name="surgeries"
          inputData="Currently none"
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
