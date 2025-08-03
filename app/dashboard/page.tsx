import React from "react";
import DashboardNav from "./_components/DashboardNav";
import DashboardStats from "./_components/DashboardStats";
import Link from "next/link";
import DashboardCalendar from "./_components/DashboardCalendar";

export default function page() {
  return (
    <div>
      <DashboardNav />
      <main className="mt-4 bg-[var(--secondary)] p-4 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-[var(--text-soft)]">
              Plan, prioritize and accomplisch yor appointments with ease.
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <Link className="appointBtn" href="/">
              Create new appointment
            </Link>
            <Link className="bg-btn" href="/">
              Share appointment link
            </Link>
          </div>
        </div>
        <DashboardStats />
        <DashboardCalendar />
      </main>
    </div>
  );
}
