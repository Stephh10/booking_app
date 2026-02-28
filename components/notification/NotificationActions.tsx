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
import { useRef } from "react";
export default function NotificationActions({
  setSearchValue,
  setOrder,
}: {
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
}) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function handleSearch(value: string) {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setSearchValue(value);
    }, 1000);
  }

  function handleOrderChange(value: "asc" | "desc") {
    if (value) {
      setOrder(value);
    }
  }
  return (
    <div className="flex items-center gap-2 my-2">
      <div className="flex-1 border rounded-md h-[35px] pl-2">
        <input
          onChange={(e) => handleSearch(e.target.value)}
          className="h-full w-full outline-none"
          type="text"
          placeholder="Search..."
        />
      </div>
      <Select onValueChange={handleOrderChange} defaultValue={"desc"}>
        <SelectTrigger className="flex-1 shadow-none">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="desc">Newest</SelectItem>
            <SelectItem value="asc">Oldest</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
