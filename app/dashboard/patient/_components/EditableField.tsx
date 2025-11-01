import { FieldErrors } from "react-hook-form";
import { PatientDataForm } from "@/types/patientDataForm";

import React from "react";
type FieldProps = {
  label: string;
  name: string;
  inputData: string | number | null;
  isEditing: boolean;
  register?: any;
  errors?: FieldErrors<PatientDataForm>;
};

export default function EditableField({
  label,
  name,
  inputData,
  isEditing,
  register,
  errors,
}: FieldProps) {
  const fieldError = false;
  return (
    <div className="inputControl">
      <label htmlFor={name}>{label}</label>
      {!isEditing ? (
        <h2 className="formText mt-1">{inputData}</h2>
      ) : (
        <div className="mt-1">
          <input
            id={name}
            name={name}
            defaultValue={inputData}
            type="text"
            {...register(name)}
          />
          {fieldError && (
            <p className="text-red-500 text-sm">
              {fieldError && "Place for error message"}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
