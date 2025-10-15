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
import { createPatient } from "@/app/actions/patients";
import { useTransition } from "react";
import { Patient } from "@/types/patient";

export default function AddPatientDialog() {
  const [openDialog, setOpenDialog] = useState(false);
  const [isPending, startTransition] = useTransition();
  function handleCreatePatient(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const formData = Object.fromEntries(fd.entries()) as unknown as Patient;

    startTransition(() => {
      createPatient(formData);
    });

    setOpenDialog(false);
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <button className="primaryBtn">Create Patient</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleCreatePatient}>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Create new patient here.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" name="firstName" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" name="lastName" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="phone">Phone</Label>
              <Input type="number" id="phone" name="phone" />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button className="cursor-pointer" type="submit">
              {isPending ? "Loading" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
