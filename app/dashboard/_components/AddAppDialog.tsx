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
  const activeUser = useSession().data?.user;

  function handleAppSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const formData = Object.fromEntries(fd.entries());

    const appointmentData = {
      ...formData,
      doctorId: activeUser?.id,
      date: selectedDate ? selectedDate.toISOString() : undefined,
    };

    console.log(appointmentData);
    startTransition(() => {
      createAppointment();
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="appointBtn">+ Create Appointment</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
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
              <Label htmlFor="username-1">Duration</Label>
              <Input id="duration" name="duration" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <button className="appointBtn">Create</button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
