import React from "react";

import { useAddAppointment } from "@/store/appointmentModal/useAddAppointment";
import { useAddPatient } from "@/store/appointmentModal/useAddPatient";
import { useAppointmentStep } from "@/store/appointmentModal/useAppointmentStep";

export default function ConfirmationDialog() {
  const { appointmentData } = useAddAppointment();
  const { patientData } = useAddPatient();
  const { step, changeStep } = useAppointmentStep();

  return (
    <div>
      <p>Are you sure you want to create an appointment for:</p>
      <p>
        {patientData?.firstName} {patientData?.lastName}
      </p>
      {/* <p>{appointmentData?.date}</p>
    <p>{appointmentData?.time}</p> */}
      <div className=" flex-centermt-3 flex gap-2 justify-end mt-4">
        <button
          onClick={() => changeStep(step - 1)}
          className="outlineBtn w-[100px]"
        >
          Back
        </button>
        <button type="submit" className="primaryBtn w-[100px]">
          Confirm
        </button>
      </div>
    </div>
  );
}
