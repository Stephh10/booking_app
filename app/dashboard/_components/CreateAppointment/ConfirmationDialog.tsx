import React, { useEffect } from "react";

import { useAddAppointment } from "@/store/appointmentModal/useAddAppointment";
import { useAddPatient } from "@/store/appointmentModal/useAddPatient";
import { useAppointmentStep } from "@/store/appointmentModal/useAppointmentStep";
import { useTransition } from "react";
import { createAppointment } from "@/app/actions/appointments";
import { FileClock } from "lucide-react";
import ConfirmationDialogItem from "./ConfirmationDialogItem";
import { formatWorkCardDate } from "@/lib/dateFormats/formatWorkCardDate";
import { getSelectedDate } from "../../_lib/getSelectedDate";
import { Spinner } from "@/components/ui/spinner";
import clsx from "clsx";
import { toast } from "react-toastify";

export default function ConfirmationDialog({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const { appointmentData, clearAppointmentData } = useAddAppointment();
  const { patientData, clearPatientData } = useAddPatient();
  const { step, changeStep } = useAppointmentStep();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!patientData?.firstName || !patientData?.lastName || !appointmentData) {
      changeStep(1);
    }
  }, []);

  function handleCreateAppointment() {
    const data = { ...patientData, ...appointmentData };

    if (!data) return;
    startTransition(async () => {
      const response = await createAppointment(data);

      if ("error" in response) {
        toast.error(response.error);
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
          <p className="font-bold flex items-center gap-2">
            <FileClock size={22} /> Appointment scheduled on{" "}
            {appointmentData && getSelectedDate(appointmentData?.date)} at{" "}
            {appointmentData && formatWorkCardDate(appointmentData?.time)}
          </p>
        </div>
        <div className="mt-2">
          <h2 className="font-bold">Reason</h2>
          <p>{appointmentData?.reason || "Not Selected"}</p>
        </div>
        <div className="mt-2">
          <h2 className="font-bold">Diagnosis</h2>
          <p>{appointmentData?.diagnose || "Not Selected"}</p>
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
          className={clsx(
            "primaryBtn w-[100px]",
            isPending && "bg-[var(--disabled)] cursor-not-allowed",
          )}
        >
          {isPending ? (
            <Spinner className="size-6 mx-auto text-[var(--text-soft)]" />
          ) : (
            "Create"
          )}
        </button>
      </div>
    </div>
  );
}
