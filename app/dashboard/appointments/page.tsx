import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardNav from "../_components/DashboardNav";
import TodayAppointmentsTable from "./_components/tables/TodayAppointmentsTable/TodayAppointmentsTable";
import { getTodaysAppointments } from "@/app/actions/appointments";
import { getAllAppointments } from "@/app/actions/appointments";
import { getPastAppointments } from "@/app/actions/appointments";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const paramsData = await searchParams;
  const currentView = paramsData?.view || "all";

  const [todaysAppData, allAppointments, pastAppData] = await Promise.all([
    getTodaysAppointments(),
    getAllAppointments(),
    getPastAppointments(),
  ]);

  const safeTodaysAppData = Array.isArray(todaysAppData) ? todaysAppData : [];
  const safeAllAppointments = Array.isArray(allAppointments)
    ? allAppointments
    : [];
  const safePastAppData = Array.isArray(pastAppData) ? pastAppData : [];

  return (
    <>
      <DashboardNav />
      <div className="mt-4 2 bg-[var(--secondary)] p-4 rounded-2xl">
        <Tabs className="w-full" defaultValue={currentView}>
          <TabsList className="w-full flex border-1 p-0">
            <TabsTrigger
              className="menuTab
             data-[state=active]:bg-[var(--btn-primary)] 
             data-[state=active]:text-white "
              value="today"
            >
              Today's Appointments
            </TabsTrigger>
            <TabsTrigger
              className="menuTab
             data-[state=active]:bg-[var(--btn-primary)] 
             data-[state=active]:text-white"
              value="completed"
            >
              Completed Today
            </TabsTrigger>
            <TabsTrigger
              className="menuTab
             data-[state=active]:bg-[var(--btn-primary)] 
             data-[state=active]:text-white "
              value="all"
            >
              All Appointments
            </TabsTrigger>
          </TabsList>
          <TabsContent value="today">
            <TodayAppointmentsTable data={safeTodaysAppData} />
          </TabsContent>
          <TabsContent value="completed">
            <h2>Completed today</h2>
          </TabsContent>
          <TabsContent value="all">
            <h2>All Appointments</h2>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
