import React from "react";

export default function DashboardStats() {
  return (
    <div className="flex gap-2 my-4">
      <div className="dashboardStats border-[var(--border)]">
        <h2>Today's Appointments</h2>
        <p className="font-bold text-2xl">5</p>
      </div>
      <div className="dashboardStats">
        <h2>Next Appointment</h2>
        <h2 className="font-bold text-xl">September 5, 2025 - 10AM</h2>
        <p>Kevin Punter</p>
      </div>
      <div className="dashboardStats border-[var(--border)]">
        <h2>Total Patients</h2>
        <p className="font-bold text-2xl">150</p>
      </div>
    </div>
  );
}
