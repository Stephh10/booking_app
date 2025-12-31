import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardNav from "../_components/DashboardNav";
import { getTodaysAppointments } from "@/app/actions/appointments";
import { getAllAppointments } from "@/app/actions/appointments";
import { getPastAppointments } from "@/app/actions/appointments";

import CompleteAppointmentsTable from "./_components/tables/CompleteAppointmentsTable/CompleteAppointmentsTable";
import TodayAppointmentsTable from "./_components/tables/TodayAppointmentsTable/TodayAppointmentsTable";
import AppointmentsTable from "./_components/tables/AppointmentsTable/AppointmentsTable";
import TabListApp from "./_components/TabListApp";

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
          <TabListApp />
          <TabsContent value="today">
            <TodayAppointmentsTable data={safeTodaysAppData} />
          </TabsContent>
          <TabsContent value="completed">
            <CompleteAppointmentsTable data={safePastAppData} />
          </TabsContent>
          <TabsContent value="all">
            <AppointmentsTable data={safeAllAppointments} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
