import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { X, SquareCheck } from "lucide-react";

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
        <button>
          <X className="text-[var(--text-soft)]" size={20} />
        </button>
        <div className="flex items-center justify-between">
          <h1>Notifications</h1>
          <div className="text-[var(--btn-primary)] flex items-center gap-1  cursor-pointer">
            <SquareCheck className="" size={18} />
            <p>Mark all as read</p>
          </div>
        </div>

        <DropdownMenuLabel className="text-[var(--text-soft)]">
          Welcome to your Patient Management Dashboard! Track patient progress,
          manage appointments, and access medical records efficiently.
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
