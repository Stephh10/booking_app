import React from "react";
import { Bell } from "lucide-react";
import Avatar from "@/components/Avatar";

export default function DashboardNav() {
  return (
    <nav>
      <h2>Dashboard</h2>
      <div className="flex gap-1">
        <Bell size={20} />
        <Avatar
          src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
          alt="AvatarImg"
        />
      </div>
    </nav>
  );
}
