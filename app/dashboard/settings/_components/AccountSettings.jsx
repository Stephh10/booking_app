import React from "react";

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
import DeleteAccountSettings from "./DeleteAccountSettings";

export default function AccountSettings() {
  const errors = {};
  const register = () => {};

  const { isEditing } = useEditSettings();

  return (
    <div className="mt-2">
      <h1 className="settingsHeader">Account Settings</h1>
      <form className="w-full">
        <div className="inputSection">
          <div className="flex flex-col flex-1">
            <Label>Account Role</Label>
            {isEditing ? (
              <Select>
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
              <h2 className="formText">Something</h2>
            )}
          </div>
          <EditableField
            label="Speciality"
            name="speciality"
            inputData={"None"}
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
