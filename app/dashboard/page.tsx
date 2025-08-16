import React from "react";
import DashboardNav from "./_components/DashboardNav";
import DashboardStats from "./_components/DashboardStats";
import Link from "next/link";
import DashboardCalendar from "./_components/DashboardCalendar";
import AddAppDialog from "./_components/AddAppDialog";
import PageHeader from "@/components/PageHeader";
import { getAllAppointments } from "../actions/appointments";

export default async function page() {
  const appointmentsData = await getAllAppointments();

  console.log(appointmentsData);
  return (
    <div>
      <DashboardNav />
      <main className="mt-4 bg-[var(--secondary)] p-4 rounded-xl">
        <PageHeader
          title="Dashboard"
          description="Plan, prioritize and accomplisch yor appointments with ease."
        >
          <AddAppDialog />
          <Link className="outlineBtn" href="/">
            Share appointment link
          </Link>
        </PageHeader>
        <DashboardStats />
        <DashboardCalendar appointments={appointmentsData} />
      </main>
    </div>
  );
}
