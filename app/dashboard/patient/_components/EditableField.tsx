import { FieldErrors } from "react-hook-form";
import { PatientDataForm } from "@/types/patientDataForm";

import React from "react";
type FieldProps = {
  label: string;
  name: string;
  inputData: string | number | null;
  isEditing: boolean;
  register?: any;
  inputType?: string | null;
  errors?: any;
  validation?: any;
};

export default function EditableField({
  label,
  name,
  inputData,
  isEditing,
  register,
  inputType,
  errors,
  validation = {},
}: FieldProps) {
  const fieldError = errors?.[name];
  return (
    <div className="inputControl">
      <label className="" htmlFor={name}>
        {label}
      </label>
      {!isEditing ? (
        <h2 className="formText pt-[6px]">{inputData ? inputData : ""}</h2>
      ) : (
        <div className="">
          {inputType !== "textarea" ? (
            <input
              id={name}
              name={name}
              className="border-1 border-neutral-400 rounded"
              defaultValue={inputData || ""}
              placeholder={
                inputData ? inputData : inputType === "password" ? "" : ""
              }
              type={inputType ? inputType : "text"}
              {...register(name, validation)}
            />
          ) : (
            <textarea
              id={name}
              name={name}
              className="border-2 border-neutral-200 rounded"
              defaultValue={inputData || ""}
              {...register(name, validation)}
            />
          )}

          {fieldError && (
            <p className="text-red-500 text-sm">
              {fieldError.message as string}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
