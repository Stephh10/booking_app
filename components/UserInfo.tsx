"use client";

import React, { useState } from "react";
import { Patient } from "@prisma/client";
import { Phone, AtSign, Hash } from "lucide-react";
import { AppProfileDrop } from "@/app/dashboard/appointments/_components/AppProfileDrop";
import { SquarePen, X, CalendarX } from "lucide-react";
import { useEditPatientState } from "@/store/useEditPatientState";
import { useEditAppountmentState } from "@/store/useEditAppountmentState";
import { DialogDeletePatient } from "@/app/dashboard/patient/_components/DialogDeletePatient";
import { ChangeStatusDialog } from "./ChangeStatusDialog";
import { Appointment } from "@prisma/client";

export default function UserInfo({
  patientData,
  profileRouteId,
  appointmentData,
}: {
  patientData: Patient | { error: string };
  profileRouteId?: string;
  appointmentData?: Appointment;
}) {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenChangeStatus, setIsOpenChangeStatus] = useState(false);

  const { isEditing, setIsEditing } = useEditPatientState();
  const { isEditingAppointment, setIsEditingAppointment } =
    useEditAppountmentState();

  if (patientData && "error" in patientData) {
    return <p>{patientData.error}</p>;
  }
  return (
    <>
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
          {/* CHANGE APPOINTMENT STATUS */}
          {!profileRouteId && (
            <button
              onClick={() => setIsOpenChangeStatus(true)}
              className="outlineBtn rounded-lg border-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-200"
              disabled={appointmentData?.status !== "scheduled"}
            >
              <CalendarX size={20} />
            </button>
          )}
          {/* EDIT PATIENT */}
          {profileRouteId &&
            (!isEditing ? (
              <button className="outlineBtn rounded-lg border-1">
                <SquarePen onClick={() => setIsEditing(true)} size={20} />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="outlineBtn rounded-lg bg-[var(--destructive)] text-[var(--bg)]"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          {/* EDIT APPOINTMENT */}
          {!profileRouteId &&
            (!isEditingAppointment ? (
              <button className="outlineBtn rounded-lg border-1">
                <SquarePen
                  onClick={() => setIsEditingAppointment(true)}
                  size={20}
                />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditingAppointment(false)}
                  className="outlineBtn rounded-lg border-1 bg-[var(--destructive)] text-[var(--bg)]"
                >
                  <X size={20} />
                </button>
              </div>
            ))}

          <AppProfileDrop
            patientId={patientData.id}
            profileRouteId={profileRouteId}
            setIsOpenDelete={setIsOpenDelete}
          />
        </div>
      </div>
      <DialogDeletePatient
        isOpen={isOpenDelete}
        setIsOpen={setIsOpenDelete}
        patientId={patientData.id}
      />
      <ChangeStatusDialog
        appointmentId={appointmentData?.id || ""}
        isOpen={isOpenChangeStatus}
        setIsOpen={() => setIsOpenChangeStatus(false)}
      />
    </>
  );
}
