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

export default function PatientDetails() {
  return (
    <div className="w-[450px]">
      <div className="inputSection">
        <div className="inputControl">
          <label htmlFor="">First Name</label>
          <input type="text" />
        </div>
        <div className="inputControl">
          <label htmlFor="">Last Name</label>
          <input type="text" />
        </div>
      </div>
      <div className="inputSection">
        <div className="inputControl">
          <label htmlFor="">Gender</label>
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
        </div>
        <div className="inputControl">
          <label htmlFor="">Date of birth</label>
          <div className="w-full">
            <InputDateSelector />
          </div>
        </div>
      </div>
      <div className="inputControl">
        <label htmlFor="">NationalId (JMBG)</label>
        <input type="text" />
      </div>
      <div className="inputControl">
        <label htmlFor="">Email</label>
        <input type="text" />
      </div>
      <div className="inputControl">
        <label htmlFor="">Phone</label>
        <input type="number" />
      </div>
      <div className="inputSection">
        <div className="inputControl">
          <label htmlFor="">City</label>
          <input type="text" />
        </div>
        <div className="inputControl">
          <label htmlFor="">Postal Code</label>
          <input type="number" />
        </div>
      </div>
    </div>
  );
}
