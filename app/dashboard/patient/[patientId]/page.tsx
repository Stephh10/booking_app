import React from "react";
import { Phone, AtSign, Hash } from "lucide-react";
import { AppProfileDrop } from "../../appointments/_components/AppProfileDrop";
import { getSelectedPatient } from "@/app/actions/patients";
import { Patient } from "@/types/patient";

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
        <AppProfileDrop
          profileRouteId={params.patientId}
          patientId={params.patientId}
        />
      </div>
    </div>
  );
}
