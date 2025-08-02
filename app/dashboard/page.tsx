import React from "react";
import DashboardNav from "./_components/DashboardNav";
import DashboardStats from "./_components/DashboardStats";

export default function page() {
  return (
    <div>
      <DashboardNav />
      <DashboardStats />
    </div>
  );
}
