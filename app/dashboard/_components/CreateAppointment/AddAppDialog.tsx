"use client";

import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
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
import { useTransition } from "react";
import { createAppointment } from "@/app/actions/appointments";
import CreateAppointmentApp from "./CreateAppointmentApp";
import ConfirmationDialog from "./ConfirmationDialog";
import { useSession } from "next-auth/react";

import { useAppointmentStep } from "@/store/appointmentModal/useAppointmentStep";
import { useAddPatient } from "@/store/appointmentModal/useAddPatient";
import { useAddAppointment } from "@/store/appointmentModal/useAddAppointment";

export default function AddAppDialog() {
  const [isPending, startTransition] = useTransition();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const activeUser = useSession().data?.user;

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
        <button className="primaryBtn">+ Create Appointment</button>
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

      {/* <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto rounded-scrollbar">
        <DialogHeader>
          <DialogTitle>Create Appointment</DialogTitle>
          <DialogDescription>
            Fill in the details below to schedule a new appointment.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAppSubmit}>
          <div className="grid gap-4">
            <DatePicker date={selectedDate} setDate={setSelectedDate} />
            <div className="grid gap-3">
              <Label htmlFor="reason">Reason</Label>
              <Textarea id="reason" name="reason" />
            </div>
            <div className="grid gap-3 mb-4">
              <Label htmlFor="username-1">Duration (Minutes)</Label>
              <Input id="duration" type="number" name="duration" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="diagnose">Diagnose</Label>
              <Textarea id="diagnose" name="diagnose" />
            </div>
            <div className="grid gap-3 mb-4">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" type="text" name="firstName" />
            </div>
            <div className="grid gap-3 mb-4">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" type="text" name="lastName" />
            </div>
            <div className="grid gap-3 mb-4">
              <Label htmlFor="patientEmail">Patient Email</Label>
              <Input
                id="patientEmail"
                type="patientEmail"
                name="patientEmail"
              />
            </div>
            <div className="grid gap-3 mb-4">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="phone" name="phone" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <button className="appointBtn">
              {isPending ? "Creating..." : "Create Appointment"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent> */}
    </Dialog>
  );
}
