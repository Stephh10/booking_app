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

export default function PatientDetails() {
  const { isEditing } = useEditPatientState();

  return (
    <div className="w-[450px]">
      <div className="inputSection">
        <div className="inputControl">
          <label htmlFor="">First Name</label>
          {!isEditing ? (
            <h2 className="formText">Kevin</h2>
          ) : (
            <input type="text" />
          )}
        </div>
        <div className="inputControl">
          <label htmlFor="">Last Name</label>
          {!isEditing ? (
            <h2 className="formText">Punter</h2>
          ) : (
            <input type="text" />
          )}
        </div>
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
      <div className="inputControl">
        <label htmlFor="">National Id (JMBG)</label>
        {!isEditing ? (
          <h2 className="formText">7346726487264823</h2>
        ) : (
          <input type="text" />
        )}
      </div>
      <div className="inputControl">
        <label htmlFor="">Email</label>
        {!isEditing ? (
          <h2 className="formText">kev@gmail.com</h2>
        ) : (
          <input type="text" />
        )}
      </div>
      <div className="inputControl">
        <label htmlFor="">Phone</label>
        {!isEditing ? (
          <h2 className="formText">387 65 223 345</h2>
        ) : (
          <input type="number" />
        )}
      </div>
      <div className="inputSection">
        <div className="inputControl">
          <label htmlFor="">City</label>
          {!isEditing ? (
            <h2 className="formText">Banja Luka</h2>
          ) : (
            <input type="text" />
          )}
        </div>
        <div className="inputControl">
          <label htmlFor="">Postal Code</label>
          {!isEditing ? (
            <h2 className="formText">78000</h2>
          ) : (
            <input type="number" />
          )}
        </div>
      </div>
    </div>
  );
}
