import React from "react";
import { getAppPatient } from "@/app/actions/appointments";
import { Patient } from "@/types/patient";

export default async function UserInfo({
  appId,
  children,
}: {
  appId: string;
  children: React.ReactNode;
}) {
  const data: Patient | { error: string } = await getAppPatient(appId);

  if (data && "error" in data) {
    return <p>{data.error}</p>;
  }
  const patientData = data as Patient;

  return (
    <div className="flex items-center justify-between bg-[var(--secondary)] p-4 rounded-xl mb-2 border-b-2 border-t-2">
      <div>
        <h2 className="text-xl font-bold">
          {patientData.firstName} {patientData.lastName}
        </h2>
        <div className="flex items-center gap-4 ">
          <p>ID: #{patientData.id.slice(-5)}</p>
          {patientData.phone && <p>Phone: {patientData.phone}</p>}
          {patientData.email && <p>Email: {patientData.email}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}
