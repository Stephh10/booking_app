"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { useRouter } from "next/navigation";
import { getAppPatient } from "@/app/actions/appointments";
import { useTransition } from "react";

export function AppProfileDrop({ patientId }: { patientId: string }) {
  const router = useRouter();

  function handleRedirect() {
    router.push(`/dashboard/patient/${patientId}`);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="primaryBtn">
          <Ellipsis size={22} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-50"
        side="bottom"
        align="start"
        sideOffset={4}
      >
        <DropdownMenuLabel>Edit Patient</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleRedirect} className="cursor-pointer">
            Patient Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            Change Patient
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
