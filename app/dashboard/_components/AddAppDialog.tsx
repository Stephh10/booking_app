"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/DatePicker";
import { useTransition } from "react";
import { createAppointment } from "@/app/actions/appointments";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";

export default function AddAppDialog() {
  const [isPending, startTransition] = useTransition();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const activeUser = useSession().data?.user;

  function handleAppSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const formData = Object.fromEntries(fd.entries());

    const appointmentData = {
      ...formData,
      doctorId: activeUser?.id,
      date: selectedDate ? selectedDate.toISOString() : undefined,
      duration: formData.duration
        ? parseInt(formData.duration as string, 10)
        : undefined,
    };

    if (
      !appointmentData ||
      !appointmentData.doctorId ||
      !appointmentData.date
    ) {
      console.error("Appointment data is incomplete");
      return;
    }

    startTransition(() => {
      createAppointment(appointmentData);
    });
    setOpenDialog(false);
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <button className="appointBtn">+ Create Appointment</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto rounded-scrollbar">
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
      </DialogContent>
    </Dialog>
  );
}
