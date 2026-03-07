"use client";

import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import clsx from "clsx";

interface SelectInputProps {
  name: string;
  control: any;
  customClassName?: string;
  customLabel?: string;
  isEditing?: boolean;
  inputData?: string | number | null;
  componentProps?: {
    options?: { value: string | boolean; label: string }[];
    placeholder?: string;
    disabled?: boolean;
  };
}

export const SelectInput: React.FC<SelectInputProps> = ({
  name,
  control,
  customClassName,
  customLabel,
  isEditing = true,
  inputData,
  componentProps = {},
}) => {
  const { options = [], placeholder, disabled } = componentProps;

  const isBooleanOptions =
    options.length > 0 && typeof options[0].value === "boolean";

  return (
    <div className="flex flex-col flex-1">
      {customLabel && <label className="mb-[0.5px]">{customLabel}</label>}
      {isEditing ? (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              value={
                isBooleanOptions ? String(field.value) : (field.value ?? "")
              }
              onValueChange={(val) => {
                if (isBooleanOptions) {
                  field.onChange(val === "true");
                } else {
                  field.onChange(val);
                }
              }}
              disabled={disabled}
            >
              <SelectTrigger
                className={clsx(
                  "w-full bg-[var(--card)] border border-neutral-400 shadow-none !rounded-sm mb-2",
                  customClassName,
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent
                side="bottom"
                align="center"
                avoidCollisions={false}
              >
                {options.map((opt) => (
                  <SelectItem key={String(opt.value)} value={String(opt.value)}>
                    {typeof opt.value === "boolean"
                      ? opt.value
                        ? "Yes"
                        : "No"
                      : opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      ) : (
        <h2 className="formText pt-[6px]">{inputData ? inputData : ""}</h2>
      )}
    </div>
  );
};
