import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-dropdown-menu";

type TimeSelectorProps = {
  value: string | null;
  onValueChange: (newTime: string) => void;
  disabled: boolean;
  availableDates: string[] | null;
};

export default function TimeSelector({
  value,
  onValueChange,
  disabled,
  availableDates,
}: TimeSelectorProps) {
  return (
    <div className="flex-1">
      <Label>Time</Label>
      <Select onValueChange={onValueChange} value={value ?? undefined}>
        <SelectTrigger
          disabled={disabled}
          className="w-full shadow-none bg-[var(--card)] border-neutral-400"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {availableDates &&
              availableDates.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
