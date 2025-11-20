import React, { use } from "react";

import EditableField from "../../patient/_components/EditableField";
import { useEditSettings } from "@/store/useEditSettings";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-dropdown-menu";
import SecuritySettings from "./SecuritySettings";
import DeleteAccountSettings from "./DeleteAccount/DeleteAccountSettings";
import { User } from "@prisma/client";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { updateUser } from "@/app/actions/user";

export default function AccountSettings({ userData }: { userData: User }) {
  const [isPending, startTransition] = useTransition();
  const [accountRole, setAccountRole] = React.useState(userData.role);
  const { isEditing, setIsEditing, submit } = useEditSettings();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  function onSubmit(data: any) {
    const formatedData = { ...data, role: accountRole };
    startTransition(async () => {
      await updateUser(formatedData);
      setIsEditing(false);
    });
  }

  useEffect(() => {
    if (submit) {
      handleSubmit(onSubmit)();
    }
  }, [submit]);

  return (
    <div className="mt-2">
      <h1 className="settingsHeader">Account Settings</h1>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="inputSection">
          <div className="flex flex-col flex-1">
            <Label>Account Role</Label>
            {isEditing ? (
              <Select onValueChange={(value) => setAccountRole(value)}>
                <SelectTrigger className="w-full bg-[var(--background)] border h-[35px] pl-1 text-md rounded-lg  shadow-none">
                  <SelectValue placeholder="Doctor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="doctor">Doctor</SelectItem>
                    <SelectItem value="nurse">Nurse</SelectItem>
                    <SelectItem value="physician-assistant">
                      Physician Assistant
                    </SelectItem>
                    <SelectItem value="medical-assistant">
                      Medical Assistant
                    </SelectItem>
                    <SelectItem value="technician">Technician</SelectItem>
                    <SelectItem value="therapist">Therapist</SelectItem>
                    <SelectItem value="pharmacist">Pharmacist</SelectItem>
                    <SelectItem value="paramedic">Paramedic / EMT</SelectItem>
                    <SelectItem value="admin">Administrative Staff</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : (
              <h2 className="formText">{accountRole}</h2>
            )}
          </div>
          <EditableField
            label="Speciality"
            name="speciality"
            inputData={userData.speciality}
            isEditing={isEditing}
            register={register}
            errors={errors}
          />
        </div>
        <div className="inputSection">
          <div className="flex-1">
            <Label>Account Status</Label>
            <div className="flex flex-1">
              <h2 className="formText">Active</h2>
            </div>
          </div>
          <div className="flex-1">
            <Label>Account ID</Label>
            <div className="flex flex-1">
              <h2 className="formText">#3242342345342312</h2>
            </div>
          </div>
        </div>
      </form>
      <div className="line"></div>
      <h1 className="text-lg font-bold mb-2 text-[var(--btn-primary)] ">
        Security
      </h1>
      <SecuritySettings />
      <div className="line mt-5"></div>
      <DeleteAccountSettings />
    </div>
  );
}
