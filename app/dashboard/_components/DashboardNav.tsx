import React from "react";
import Avatar from "@/components/Avatar";
import { Notification } from "@/components/notification/Notification";
import NavSearchInput from "./NavSearchInput";
import { getUser } from "@/app/actions/user";
import { getPendingAppointments } from "@/app/actions/appointments";

export default async function DashboardNav() {
  const activeUser = await getUser();
  const pendingAppointments = await getPendingAppointments();

  if ("error" in pendingAppointments || "error" in activeUser) return null;

  const { firstName, lastName, email, profileImage } = activeUser;

  return (
    <nav className="flex items-center justify-between bg-[var(--secondary)] p-4 rounded-xl">
      <NavSearchInput />
      <div className="flex items-center gap-2">
        <Notification appointments={pendingAppointments} />
        <Avatar
          src={profileImage ? profileImage.url : "/default-profile.png"}
        />
        <div className=" hidden md:block">
          <p className="text-sm font-bold">{`${firstName} ${lastName}`}</p>
          <p className="text-sm mt-[-2px] text-[var(--text-soft)]">{email}</p>
        </div>
      </div>
    </nav>
  );
}
