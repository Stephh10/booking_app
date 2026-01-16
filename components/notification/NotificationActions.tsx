import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function NotificationActions() {
  return (
    <div className="flex items-center gap-2 my-2">
      <div className="flex-1 border rounded-md h-[35px] pl-2">
        <input
          className="h-full w-full outline-none"
          type="text"
          placeholder="Search..."
        />
      </div>
      <Select>
        <SelectTrigger defaultValue={"asc"} className="flex-1 shadow-none">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="asc">Newest</SelectItem>
            <SelectItem value="desc">Oldest</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
