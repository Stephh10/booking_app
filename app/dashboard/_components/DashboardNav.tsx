import React from "react";
import { Bell } from "lucide-react";
import Avatar from "@/components/Avatar";
import { Search } from "lucide-react";

export default function DashboardNav() {
  return (
    <nav className="flex items-center justify-between bg-[var(--secondary)] p-4 rounded-xl">
      <div className="flex items-center gap-2 h-[40px] bg-[var(--bg)] rounded-lg px-2">
        <Search size={20} />
        <input
          className="h-full outline-none"
          type="text"
          placeholder="Search Appointment"
        />
      </div>
      <div className="flex items-center gap-2">
        <Bell className="cursor-pointer" size={20} />
        <Avatar src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D" />
        <div>
          <p className="text-sm font-bold">Kevin Punter</p>
          <p className="text-sm mt-[-2px] text-[var(--text-soft)]">
            kev@gmail.com
          </p>
        </div>
      </div>
    </nav>
  );
}
