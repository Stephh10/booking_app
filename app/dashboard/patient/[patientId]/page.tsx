import React from "react";
import { Phone, AtSign, Hash } from "lucide-react";
import { AppProfileDrop } from "../../appointments/_components/AppProfileDrop";
import { getSelectedPatient } from "@/app/actions/patients";
import { Patient } from "@/types/patient";
import UserInfo from "@/components/UserInfo";

export default async function page({
  params,
}: {
  params: { patientId: string };
}) {
  const { patientId } = params;

  const data: Patient | { error: string } = await getSelectedPatient(patientId);
  if (data && "error" in data) {
    return <p>{data.error}</p>;
  }
  const patientData = data as Patient;

  return (
    <div>
      <UserInfo patientData={patientData} profileRouteId={patientId} />
    </div>
  );
}
