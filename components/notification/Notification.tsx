"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { SquarePen } from "lucide-react";
import NotificationActions from "./NotificationActions";

export function Notification() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="relative bg-[var(--btn-primary)] hover:bg-[var(--btn-primary)] cursor-pointer w-10 h-10 rounded-full text-white"
          variant="outline"
        >
          {/* <div className="absolute top-[-3px] right-[-3px] bg-[var(--destructive)] w-4 h-4 rounded-full flex items-center justify-center">
            1
          </div> */}
          <Bell size={22} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[380px] p-2" align="center">
        <div className="flex items-center justify-between">
          <h1>Notifications</h1>
          <div className="text-[var(--btn-primary)] flex items-center gap-1  cursor-pointer underline">
            <SquarePen className="" size={16} />
            <p>Cancel all requests</p>
          </div>
        </div>

        <NotificationActions />

        <DropdownMenuLabel className="text-[var(--text-soft)]">
          Welcome to your Patient Management Dashboard! Track patient progress,
          manage appointments, and access medical records efficiently.
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
