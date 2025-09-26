import React from "react";
import { getAppPatient } from "@/app/actions/appointments";
import { Patient } from "@/types/patient";
import { Phone, AtSign, Hash } from "lucide-react";
import { AppProfileDrop } from "@/app/dashboard/appointments/_components/AppProfileDrop";

export default async function UserInfo({ appId }: { appId: string }) {
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
          <p className="flex items-center gap-1">
            <Hash size={18} />
            {patientData.id.slice(-7)}
          </p>
          {patientData.phone && (
            <p className="flex items-center gap-1">
              <Phone size={18} /> {patientData.phone}
            </p>
          )}
          {patientData.email && (
            <p className="flex items-center gap-1">
              <AtSign size={18} /> {patientData.email}
            </p>
          )}
        </div>
      </div>
      <AppProfileDrop patientId={patientData.id} />
    </div>
  );
}
