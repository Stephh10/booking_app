import React from "react";
import UserInfo from "@/components/UserInfo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppDetails from "../_components/AppDetails";
import AppHistory from "../_components/AppHistory";
import AppNotes from "../_components/AppNotes";
import AppAttachments from "../_components/AppAttachments";
import DashboardNav from "../../_components/DashboardNav";
import { getAppPatient } from "@/app/actions/appointments";
import { Patient } from "@prisma/client";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function page({ params }: PageProps) {
  const { id } = await params;

  const data: Patient | { error: string } = await getAppPatient(id);

  return (
    <div>
      <DashboardNav />
      <div className="p-4 bg-[var(--secondary)] rounded-2xl my-4">
        <UserInfo patientData={data} />

        <Tabs defaultValue="details" className="w-[600px]">
          <TabsList>
            <TabsTrigger className="cursor-pointer" value="details">
              Appointment Details
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="history">
              Patient History
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="notes">
              Notes
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="attachments">
              Attachments
            </TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <AppDetails appId={id} />
          </TabsContent>
          <TabsContent value="history">
            {"error" in data ? (
              <p>{data.error}</p>
            ) : (
              <AppHistory patientId={data.id} />
            )}
          </TabsContent>
          <TabsContent value="notes">
            <AppNotes appId={id} />
          </TabsContent>
          <TabsContent value="attachments">
            <AppAttachments />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
