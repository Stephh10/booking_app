import React from "react";

import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTransition } from "react";
import { useSession } from "next-auth/react";
import EditableField from "../../patient/_components/EditableField";
import { useForm } from "react-hook-form";

export default function CreatePatientApp() {
  const [isPending, startTransition] = useTransition();
  const isEditing = true;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // function handleAppSubmit(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   const fd = new FormData(e.target as HTMLFormElement);
  //   const formData = Object.fromEntries(fd.entries());

  //   const appointmentData = {
  //     ...formData,
  //     doctorId: activeUser?.id,
  //     date: selectedDate ? selectedDate.toISOString() : undefined,
  //     duration: formData.duration
  //       ? parseInt(formData.duration as string, 10)
  //       : undefined,
  //   };

  //   if (
  //     !appointmentData ||
  //     !appointmentData.doctorId ||
  //     !appointmentData.date
  //   ) {
  //     console.error("Appointment data is incomplete");
  //     return;
  //   }

  //   startTransition(() => {
  //     createAppointment(appointmentData);
  //   });
  //   setOpenDialog(false);
  // }
  return (
    <section>
      <h1 className="text-xl mb-4">PatientDetails</h1>
      <form>
        <div className="inputSection">
          <EditableField
            label="First Name"
            name="Last Name"
            inputData={""}
            isEditing={isEditing}
            register={register}
            errors={errors}
            validation={{ required: "First Name is required" }}
          />
          <EditableField
            label="Last Name"
            name="lastName"
            inputData={""}
            isEditing={isEditing}
            register={register}
            errors={errors}
            validation={{ required: "Last Name is required" }}
          />
        </div>
        <EditableField
          label="Email"
          name="email"
          inputData={""}
          isEditing={isEditing}
          register={register}
          errors={errors}
        />
        <EditableField
          label="Phone Number"
          name="phone"
          inputData={""}
          isEditing={isEditing}
          register={register}
          errors={errors}
        />
        <div className="inputSection">
          <EditableField
            label="Date Of Birth"
            name="dateOfBirth"
            inputData={""}
            isEditing={isEditing}
            register={register}
            errors={errors}
          />
          <EditableField
            label="Gender"
            name="gender"
            inputData={""}
            isEditing={isEditing}
            register={register}
            errors={errors}
          />
        </div>
        <div className="inputSection">
          <EditableField
            label="City"
            name="city"
            inputData={""}
            isEditing={isEditing}
            register={register}
            errors={errors}
          />
          <EditableField
            label="Postal Code"
            name="postalCode"
            inputData={""}
            isEditing={isEditing}
            register={register}
            errors={errors}
          />
        </div>

        {/* <div className="grid gap-4">
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
            <Input id="patientEmail" type="patientEmail" name="patientEmail" />
          </div>
          <div className="grid gap-3 mb-4">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="phone" name="phone" />
          </div> */}
        {/* </div> */}
        {/* <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <button className="appointBtn">
            {isPending ? "Creating..." : "Create Appointment"}
          </button>
        </DialogFooter> */}
      </form>
    </section>
  );
}
