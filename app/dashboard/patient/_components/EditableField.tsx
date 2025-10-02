import React from "react";
type FieldProps = {
  label: string;
  name: string;
  inputData: string | number;
  isEditing: boolean;
  register?: any;
};

export default function EditableField({
  label,
  name,
  inputData,
  isEditing,
  register,
}: FieldProps) {
  return (
    <div className="inputControl">
      <label htmlFor={name}>{label}</label>
      {!isEditing ? (
        <h2 className="formText">{inputData}</h2>
      ) : (
        <input id={name} name={name} type="text" {...register(name)} />
      )}
    </div>
  );
}
