import React from "react";
import { Bell } from "lucide-react";
import Avatar from "@/components/Avatar";

export default function DashboardNav() {
  return (
    <nav className="flex items-center justify-between bg-[var(--secondary)] p-2 rounded-xl">
      <h2 className="text-lg">Dashboard</h2>
      <div className="flex items-center gap-2">
        <Bell className="cursor-pointer" size={20} />
        <Avatar src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D" />
      </div>
    </nav>
  );
}
