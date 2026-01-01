import React from "react";
import DashboardNav from "./_components/DashboardNav";
import DashboardStats from "./_components/DashboardStats";
import DashboardCalendar from "./_components/DashboardCalendar";
import AddAppDialog from "./_components/CreateAppointment/AddAppDialog";
import PageHeader from "@/components/PageHeader";
import { getAllAppointments } from "../actions/appointments";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ShareLink from "./_components/CreateAppointment/ShareLink";

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
          <ShareLink activeUser={activeUser} />
        </PageHeader>
        <DashboardStats />
        <DashboardCalendar appointments={appointmentsData} />
      </main>
    </div>
  );
}
