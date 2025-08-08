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
import { CloudHail } from "lucide-react";

export default function AddAppDialog() {
  const [isPending, startTransition] = useTransition();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  function handleAppSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const formData = Object.fromEntries(fd.entries());

    console.log(formData);

    console.log("Submitting");
    startTransition(() => {
      createAppointment();
    });
  }

  console.log(selectedDate);
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
            <div className="grid gap-3">
              <Label htmlFor="reason">Reason</Label>
              <Input id="reason" name="reason" />
            </div>
            <DatePicker value={selectedDate} onChange={setSelectedDate} />
            <div className="grid gap-3 mb-4">
              <Label htmlFor="username-1">Duration</Label>
              <Input id="duration" name="duration" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
