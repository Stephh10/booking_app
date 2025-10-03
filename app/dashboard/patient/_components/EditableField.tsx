import { FieldErrors } from "react-hook-form";
import { PatientDataForm } from "@/types/patientDataForm";

import React from "react";
type FieldProps = {
  label: string;
  name: string;
  inputData: string | number;
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
        <h2 className="formText">{inputData}</h2>
      ) : (
        <div>
          <input id={name} name={name} type="text" {...register(name)} />
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
