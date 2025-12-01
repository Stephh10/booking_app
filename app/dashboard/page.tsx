import React from "react";
import DashboardNav from "./_components/DashboardNav";
import DashboardStats from "./_components/DashboardStats";
import Link from "next/link";
import DashboardCalendar from "./_components/DashboardCalendar";
import AddAppDialog from "./_components/CreateAppointment/AddAppDialog";
import PageHeader from "@/components/PageHeader";
import { getAllAppointments } from "../actions/appointments";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const appointmentsData = await getAllAppointments("scheduled");
  const activeUser = await auth();

  if (!activeUser || !activeUser.user) {
    return redirect("/login");
  }

  return (
    <div>
      <DashboardNav />
      <main className="mt-4 bg-[var(--secondary)] p-4 rounded-xl">
        <PageHeader
          title="Dashboard"
          description="Plan, prioritize and accomplisch yor appointments with ease."
        >
          <AddAppDialog />
          <Link className="outlineBtn" href={`/schedule/${activeUser.user.id}`}>
            Share appointment link
          </Link>
        </PageHeader>
        <DashboardStats />
        <DashboardCalendar appointments={appointmentsData} />
      </main>
    </div>
  );
}
