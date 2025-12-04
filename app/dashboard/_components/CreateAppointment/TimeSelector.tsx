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
import { generateTimeSlots } from "@/lib/dateFormats/generateTimeSlots";

export default function TimeSelector({ value, onValueChange, disabled }: any) {
  const timeSlots = generateTimeSlots();
  return (
    <div className="flex-1">
      <Label>Time</Label>
      <Select onValueChange={onValueChange} value={value}>
        <SelectTrigger
          disabled={disabled}
          className="w-full shadow-none bg-[var(--card)]"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {timeSlots.map((t) => (
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
