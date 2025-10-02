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
import { useState } from "react";
import EditableField from "./EditableField";
import { useForm, SubmitHandler } from "react-hook-form";
import { Controller } from "react-hook-form";

type Inputs = {
  firstname: string;
  lastname: string;
  gender: string;
  nationalId: string;
  email: string;
  phone: string;
  city: string;
  postalCode: string;
  dateOfBirth: Date | string;
};

export default function PatientDetails() {
  const { isEditing } = useEditPatientState();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form className="w-[450px]" onSubmit={handleSubmit(onSubmit)}>
      <div className="inputSection">
        <EditableField
          label="First Name"
          name="firstname"
          inputData="Kevin"
          isEditing={isEditing}
          register={register}
        />
        <EditableField
          label="Last Name"
          name="lastname"
          inputData="Punter"
          isEditing={isEditing}
          register={register}
        />
      </div>
      <div className="inputSection">
        <div className="inputControl">
          <label htmlFor="">Gender</label>
          {!isEditing ? (
            <h2 className="formText">Male</h2>
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
            <h2 className="formText">12/11/1990</h2>
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
        inputData="34234234234234234"
        isEditing={isEditing}
        register={register}
      />
      <EditableField
        label="Email"
        name="email"
        inputData="kev@gmail.com"
        isEditing={isEditing}
        register={register}
      />
      <EditableField
        label="Phone"
        name="phone"
        inputData="387 65 223 345"
        isEditing={isEditing}
        register={register}
      />
      <div className="inputSection">
        <EditableField
          label="City"
          name="city"
          inputData="New York"
          isEditing={isEditing}
          register={register}
        />
        <EditableField
          label="Postal Code"
          name="postalCode"
          inputData="78000"
          isEditing={isEditing}
          register={register}
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
