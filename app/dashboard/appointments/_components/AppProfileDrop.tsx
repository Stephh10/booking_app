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

export function AppProfileDrop({
  patientId,
  profileRouteId,
  setIsOpenDelete,
}: {
  patientId: string;
  profileRouteId?: string;
  setIsOpenDelete?: any;
}) {
  const router = useRouter();

  function handleRedirect() {
    router.push(`/dashboard/patient/${patientId}`);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="primaryBtn">
          <Ellipsis size={20} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-50"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel>Edit Patient</DropdownMenuLabel>
        {profileRouteId ? (
          <DropdownMenuItem
            onClick={() => {
              setTimeout(() => setIsOpenDelete(true), 50);
            }}
            className="cursor-pointer"
          >
            Delete Patient
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={handleRedirect}
              className="cursor-pointer"
            >
              Patient Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
