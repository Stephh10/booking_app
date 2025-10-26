import React from "react";
import UserInfo from "@/components/UserInfo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppDetails from "../_components/AppDetails";
import AppHistory from "../_components/AppHistory";
import AppNotes from "../_components/AppNotes";
import DashboardNav from "../../_components/DashboardNav";
import { getAppPatient } from "@/app/actions/appointments";
import { Patient } from "@prisma/client";
import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function page({ params }: PageProps) {
  const { id } = await params;

  const data: Patient | { error: string } = await getAppPatient(id);

  if ("error" in data) {
    return redirect("/dashboard");
  }

  return (
    <div>
      <DashboardNav />
      <div className="p-4 bg-[var(--secondary)] rounded-2xl my-4">
        <UserInfo patientData={data} />

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="w-full flex border-1 p-0">
            <TabsTrigger
              className="menuTab
             data-[state=active]:bg-[var(--btn-primary)] 
             data-[state=active]:text-white"
              value="details"
            >
              Appointment Details
            </TabsTrigger>
            <TabsTrigger
              className="menuTab
             data-[state=active]:bg-[var(--btn-primary)] 
             data-[state=active]:text-white"
              value="history"
            >
              Patient History
            </TabsTrigger>
            <TabsTrigger
              className="menuTab
             data-[state=active]:bg-[var(--btn-primary)] 
             data-[state=active]:text-white"
              value="notes"
            >
              Notes
            </TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <AppDetails appId={id} />
          </TabsContent>
          <TabsContent value="history">
            {"error" in data ? (
              <p>{(data as { error: string }).error}</p>
            ) : (
              <AppHistory patientId={(data as Patient).id} />
            )}
          </TabsContent>
          <TabsContent value="notes">
            <AppNotes appId={id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
