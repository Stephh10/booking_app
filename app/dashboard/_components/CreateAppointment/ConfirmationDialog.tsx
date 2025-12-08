import React, { useEffect } from "react";

import { useAddAppointment } from "@/store/appointmentModal/useAddAppointment";
import { useAddPatient } from "@/store/appointmentModal/useAddPatient";
import { useAppointmentStep } from "@/store/appointmentModal/useAppointmentStep";
import { useTransition } from "react";
import { createAppointment } from "@/app/actions/appointments";
import { FileClock } from "lucide-react";
import ConfirmationDialogItem from "./ConfirmationDialogItem";

export default function ConfirmationDialog({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const { appointmentData, clearAppointmentData } = useAddAppointment();
  const { patientData, clearPatientData } = useAddPatient();
  const { step, changeStep } = useAppointmentStep();
  const [isPending, startTransition] = useTransition();

  // useEffect(() => {
  //   if (!patientData?.firstName || !patientData?.lastName || !appointmentData) {
  //     changeStep(1);
  //   }
  // }, []);

  function handleCreateAppointment() {
    const data = { ...patientData, ...appointmentData };

    if (!data) return;
    startTransition(async () => {
      const response = await createAppointment(data);

      if ("error" in response) {
        console.log("An error ocured");
      } else {
        closeModal();
        clearPatientData();
        clearAppointmentData();
        changeStep(1);
      }
    });
  }

  return (
    <div>
      <h1 className="text-xl mt-2 mb-4">Confirm Appointment</h1>
      <div className="mt-2">
        <ConfirmationDialogItem
          label="Patient Name"
          value={patientData?.firstName}
        />
        <ConfirmationDialogItem
          label="Last Name"
          value={patientData?.lastName}
        />
        <ConfirmationDialogItem label="Email" value={patientData?.email!} />
        <ConfirmationDialogItem label="Phone" value={patientData?.phone!} />
        <ConfirmationDialogItem
          label="National ID"
          value={patientData?.nationalId!}
        />
        <ConfirmationDialogItem label="Gender" value={patientData?.gender!} />
        <div className="line"></div>
        <div>
          <p className="font-bold flex items-center gap-1">
            <FileClock size={22} /> Appointment scheduled for: 11/11/2023 at
            10:00am
          </p>
        </div>
        <div className="mt-2">
          <h2 className="font-bold">Reason</h2>
          <p>Something here</p>
        </div>
        <div className="mt-2">
          <h2 className="font-bold">Diagnosis</h2>
          <p>Something here</p>
        </div>
      </div>
      <div className=" flex-centermt-3 flex gap-2 justify-end mt-4">
        <button
          onClick={() => changeStep(step - 1)}
          className="outlineBtn w-[100px]"
        >
          Back
        </button>
        <button
          disabled={isPending}
          onClick={handleCreateAppointment}
          type="submit"
          className="primaryBtn w-[100px]"
        >
          {isPending ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  );
}
