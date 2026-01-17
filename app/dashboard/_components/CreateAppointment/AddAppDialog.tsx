"use client";

import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTrigger,
} from "@/components/ui/stepper";
import CreatePatientApp from "./CreatePatientApp";
import { Check, LoaderCircleIcon } from "lucide-react";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateAppointmentApp from "./CreateAppointmentApp";
import ConfirmationDialog from "./ConfirmationDialog";

import { useAppointmentStep } from "@/store/appointmentModal/useAppointmentStep";
import { useAddPatient } from "@/store/appointmentModal/useAddPatient";
import { useAddAppointment } from "@/store/appointmentModal/useAddAppointment";

export default function AddAppDialog() {
  const [openDialog, setOpenDialog] = useState(false);

  const closeModal = () => setOpenDialog(false);
  const steps = [
    <CreatePatientApp />,
    <CreateAppointmentApp />,
    <ConfirmationDialog closeModal={closeModal} />,
  ];

  const { step, changeStep } = useAppointmentStep();
  const { clearPatientData } = useAddPatient();
  const { clearAppointmentData } = useAddAppointment();

  return (
    <Dialog
      open={openDialog}
      onOpenChange={(isOpen) => {
        setOpenDialog(isOpen);
        if (!isOpen) {
          changeStep(1);
          clearPatientData();
          clearAppointmentData();
        }
      }}
    >
      <DialogTrigger asChild>
        <button className="flex flex-1 md:flex-none primaryBtn  items-center gap-0">
          New Appointment
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>{""}</DialogTitle>
        <Stepper
          value={step}
          defaultValue={2}
          indicators={{
            completed: <Check className="size-4" />,
            loading: <LoaderCircleIcon className="size-4 animate-spin" />,
          }}
        >
          <StepperNav>
            {steps.map((stepData, index) => (
              <StepperItem
                key={index}
                step={index + 1}
                className="relative flex-1 items-start "
              >
                <StepperTrigger
                  onClick={() => changeStep(index + 1)}
                  className="flex flex-col gap-2.5"
                >
                  <StepperIndicator>{index + 1}</StepperIndicator>
                </StepperTrigger>
                {steps.length > index + 1 && (
                  <StepperSeparator className="absolute top-3 inset-x-0 left-[calc(50%+0.875rem)] m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem+0.225rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none group-data-[state=completed]/step:bg-primary " />
                )}
              </StepperItem>
            ))}
          </StepperNav>
          <StepperPanel className="text-sm">
            {steps.map((stepData, index) => (
              <StepperContent key={index} value={index + 1} className="w-full">
                {stepData}
              </StepperContent>
            ))}
          </StepperPanel>
        </Stepper>
      </DialogContent>
    </Dialog>
  );
}
