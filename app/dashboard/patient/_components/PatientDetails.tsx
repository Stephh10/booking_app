"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InputDateSelector } from "@/components/InputDateSelector";
import { useEditPatientState } from "@/store/useEditPatientState";
import { useState } from "react";
import EditableField from "./EditableField";

export default function PatientDetails() {
  const { isEditing } = useEditPatientState();
  const [formData, setFormData] = useState({});

  return (
    <form className="w-[450px]">
      <div className="inputSection">
        <EditableField
          label="First Name"
          name="firstname"
          inputData="Kevin"
          isEditing={isEditing}
          setFormData={setFormData}
        />
        <EditableField
          label="Last Name"
          name="lastname"
          inputData="Punter"
          isEditing={isEditing}
          setFormData={setFormData}
        />
      </div>
      <div className="inputSection">
        <div className="inputControl">
          <label htmlFor="">Gender</label>
          {!isEditing ? (
            <h2 className="formText">Male</h2>
          ) : (
            <Select>
              <SelectTrigger className="w-full bg-[var(--background)]">
                <SelectValue
                  placeholder="Select Gender"
                  className="text-[var(--text-soft)]"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Male</SelectItem>
                <SelectItem value="dark">Female</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
        <div className="inputControl">
          <label htmlFor="">Date of birth</label>
          {!isEditing ? (
            <h2 className="formText">12/11/1990</h2>
          ) : (
            <div className="w-full">
              <InputDateSelector />
            </div>
          )}
        </div>
      </div>
      <EditableField
        label="National ID"
        name="nationalId"
        inputData="34234234234234234"
        isEditing={isEditing}
        setFormData={setFormData}
      />
      <EditableField
        label="Email"
        name="email"
        inputData="kev@gmail.com"
        isEditing={isEditing}
        setFormData={setFormData}
      />
      <EditableField
        label="Phone"
        name="phone"
        inputData="387 65 223 345"
        isEditing={isEditing}
        setFormData={setFormData}
      />
      <div className="inputSection">
        <EditableField
          label="City"
          name="city"
          inputData="New York"
          isEditing={isEditing}
          setFormData={setFormData}
        />
        <EditableField
          label="Postal Code"
          name="postalCode"
          inputData="78000"
          isEditing={isEditing}
          setFormData={setFormData}
        />
      </div>
      {isEditing && (
        <div className="mt-4">
          <button className="primaryBtn w-[220px] ml-auto ">Update</button>
        </div>
      )}
    </form>
  );
}
