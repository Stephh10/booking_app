import React from "react";
import { getSelectedPatient } from "@/app/actions/patients";
import { Patient } from "@prisma/client";
import UserInfo from "@/components/UserInfo";
import DashboardNav from "../../_components/DashboardNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppHistory from "../../appointments/_components/AppHistory";
import PatientDetails from "../_components/PatientDetails";
import PatientMedicalDetails from "../_components/PatientMedicalDetails";
import { getPatientMedicalDetails } from "@/app/actions/patients";
import { MedicalDetails } from "@prisma/client";

export default async function page({
  params,
}: {
  params: { patientId: string };
}) {
  const { patientId } = await params;

  // PATIENT DATA

  const data: Patient | { error: string } = await getSelectedPatient(patientId);
  if (data && "error" in data) {
    return <p>{data.error}</p>;
  }
  const patientData = data as Patient;

  if (!patientData) {
    return <p>Patient not found</p>;
  }

  //PATIENT MEDICAL DETAILS

  const patientMedicalDetails: MedicalDetails | { error: string } =
    await getPatientMedicalDetails(patientId);

  return (
    <div>
      <DashboardNav />
      <div className="p-4 bg-[var(--secondary)] rounded-2xl my-4">
        <UserInfo patientData={patientData} profileRouteId={patientId} />
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="w-full flex border-1 p-0">
            <TabsTrigger
              className="menuTab
             data-[state=active]:bg-[var(--btn-primary)] 
             data-[state=active]:text-white"
              value="details"
            >
              Patient Details
            </TabsTrigger>
            <TabsTrigger
              className="menuTab
             data-[state=active]:bg-[var(--btn-primary)] 
             data-[state=active]:text-white"
              value="medical-details"
            >
              Medical Details
            </TabsTrigger>
            <TabsTrigger
              className="menuTab
             data-[state=active]:bg-[var(--btn-primary)] 
             data-[state=active]:text-white"
              value="history"
            >
              Patient History
            </TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <PatientDetails patientData={patientData} />
          </TabsContent>
          <TabsContent value="medical-details">
            {"error" in patientMedicalDetails ? (
              <p>{patientMedicalDetails.error}</p>
            ) : (
              <PatientMedicalDetails patientMedData={patientMedicalDetails} />
            )}
          </TabsContent>
          <TabsContent value="history">
            <AppHistory patientId={patientId} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
