import React from "react";
import Avatar from "@/components/Avatar";
import { auth } from "@/auth";
import { Notification } from "@/components/Notification";
import NavSearchInput from "./NavSearchInput";

export default async function DashboardNav() {
  const activeUser = await auth();
  const { id, email, firstName, lastName } = activeUser?.user ?? {};

  return (
    <nav className="flex items-center justify-between bg-[var(--secondary)] p-4 rounded-xl">
      <NavSearchInput />
      <div className="flex items-center gap-2">
        <Notification />
        <Avatar src="/default-profile.png" />
        <div className=" hidden md:block">
          <p className="text-sm font-bold">{`${firstName} ${lastName}`}</p>
          <p className="text-sm mt-[-2px] text-[var(--text-soft)]">{email}</p>
        </div>
      </div>
    </nav>
  );
}
