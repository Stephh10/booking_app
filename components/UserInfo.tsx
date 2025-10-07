"use client";

import React from "react";
import { Patient } from "@prisma/client";
import { Phone, AtSign, Hash } from "lucide-react";
import { AppProfileDrop } from "@/app/dashboard/appointments/_components/AppProfileDrop";
import { SquarePen, X, Save } from "lucide-react";
import { useEditPatientState } from "@/store/useEditPatientState";

export default function UserInfo({
  patientData,
  profileRouteId,
}: {
  patientData: Patient | { error: string };
  profileRouteId?: string;
}) {
  const { isEditing, setIsEditing } = useEditPatientState();
  if (patientData && "error" in patientData) {
    return <p>{patientData.error}</p>;
  }
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
      <div className="flex items-center gap-2">
        {profileRouteId &&
          (!isEditing ? (
            <button className="outlineBtn">
              <SquarePen onClick={() => setIsEditing(true)} size={20} />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="outlineBtn bg-[var(--destructive)] text-[var(--bg)]"
              >
                <X />
              </button>
              {/* <button
                onClick={() => setIsEditing(false)}
                className="outlineBtn bg-[var(--btn-primary)] text-[var(--bg)]"
              >
                <Save />
              </button> */}
            </div>
          ))}
        <AppProfileDrop
          patientId={patientData.id}
          profileRouteId={profileRouteId}
        />
      </div>
    </div>
  );
}
