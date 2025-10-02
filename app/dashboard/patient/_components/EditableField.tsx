import { Input } from "@/components/ui/input";
import React from "react";
type FieldProps = {
  label: string;
  name: string;
  inputData: string | number;
  isEditing: boolean;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

export default function EditableField({
  label,
  name,
  inputData,
  isEditing,
  setFormData,
}: FieldProps) {
  return (
    <div className="inputControl">
      <label htmlFor={name}>{label}</label>
      {!isEditing ? (
        <h2 className="formText">{inputData}</h2>
      ) : (
        <input
          id={name}
          name={name}
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData((prev: any) => ({ ...prev, [name]: e.target.value }))
          }
        />
      )}
    </div>
  );
}
