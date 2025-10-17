import React from "react";
import DashboardNav from "./_components/DashboardNav";
import DashboardStats from "./_components/DashboardStats";
import Link from "next/link";
import DashboardCalendar from "./_components/DashboardCalendar";
import AddAppDialog from "./_components/AddAppDialog";
import PageHeader from "@/components/PageHeader";
import { getAllAppointments } from "../actions/appointments";
import { auth } from "@/auth";

export default async function page() {
  const appointmentsData = await getAllAppointments();
  const activeUser = await auth();

  if (!activeUser || !activeUser.user) {
    return (
      <div className="p-4">
        <p>You must be logged in to view this page.</p>
        <Link href="/login" className="text-blue-500 underline">
          Go to login page
        </Link>
      </div>
    );
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
