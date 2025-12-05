import React from "react";

import { useAddAppointment } from "@/store/appointmentModal/useAddAppointment";
import { useAddPatient } from "@/store/appointmentModal/useAddPatient";
import { useAppointmentStep } from "@/store/appointmentModal/useAppointmentStep";
import { useTransition } from "react";
import { createAppointment } from "@/app/actions/appointments";

export default function ConfirmationDialog({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const { appointmentData } = useAddAppointment();
  const { patientData } = useAddPatient();
  const { step, changeStep } = useAppointmentStep();
  const [isPending, startTransition] = useTransition();

  function handleCreateAppointment() {
    const data = { ...patientData, ...appointmentData };

    if (!data) return;
    startTransition(async () => {
      const response = await createAppointment(data);

      if ("error" in response) {
        console.log("An error ocured");
      } else {
        closeModal();
      }

      console.log(response);
    });
  }

  return (
    <div>
      <p>Are you sure you want to create an appointment for:</p>
      <p>
        {patientData?.firstName} {patientData?.lastName}
      </p>
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
