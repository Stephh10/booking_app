"use client";

import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectInputProps {
  name: string;
  control: any;
  componentProps?: {
    options?: { value: string; label: string }[];
    placeholder?: string;
    disabled?: boolean;
  };
}

export const SelectInput: React.FC<SelectInputProps> = ({
  name,
  control,
  componentProps = {},
}) => {
  const { options = [], placeholder, disabled } = componentProps;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          value={field.value}
          onValueChange={field.onChange}
          disabled={disabled}
        >
          <SelectTrigger className="w-full bg-[var(--card)] border border-neutral-400 shadow-none !rounded-sm mb-2">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent side="bottom" align="center">
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
};
