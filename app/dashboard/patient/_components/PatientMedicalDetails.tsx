"use client";
import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditPatientState } from "@/store/useEditPatientState";

export default function PatientMedicalDetails() {
  const { isEditing } = useEditPatientState();

  return (
    <form className="w-[450px]">
      <div className="inputControl">
        <label htmlFor="">Diagnosis</label>
        {!isEditing ? (
          <h2 className="formText">Diabetes mellitus</h2>
        ) : (
          <input name="diagnosis" type="text" />
        )}
      </div>
      <div className="inputControl">
        <label htmlFor="">Allergies</label>
        {!isEditing ? (
          <h2 className="formText">None</h2>
        ) : (
          <input type="text" />
        )}
      </div>

      <div className="inputControl">
        <label htmlFor="">Medication</label>
        {!isEditing ? (
          <h2 className="formText">Apaurin</h2>
        ) : (
          <input type="text" />
        )}
      </div>
      <div className="inputControl">
        <label htmlFor="">Family History</label>
        {!isEditing ? (
          <h2 className="formText">None</h2>
        ) : (
          <input type="text" />
        )}
      </div>
      <div className="inputSection">
        <div className="inputControl">
          <label htmlFor="">BloodType</label>
          {!isEditing ? (
            <h2 className="formText">AB</h2>
          ) : (
            <Select>
              <SelectTrigger className="w-full bg-[var(--background)]">
                <SelectValue
                  placeholder="Blood Type"
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
          <label htmlFor="">Chronic Diseases</label>
          {!isEditing ? (
            <h2 className="formText">None</h2>
          ) : (
            <input type="text" />
          )}
        </div>
      </div>
      <div className="inputSection">
        <div className="inputControl">
          <label htmlFor="">Blood Pressure</label>
          {!isEditing ? (
            <h2 className="formText">120/140</h2>
          ) : (
            <input type="number" />
          )}
        </div>
        <div className="inputControl">
          <label htmlFor="">Heart Rate</label>
          {!isEditing ? (
            <h2 className="formText">78</h2>
          ) : (
            <input type="number" />
          )}
        </div>
      </div>

      <div className="inputSection">
        <div className="inputControl">
          <label htmlFor="">Weight</label>
          {!isEditing ? (
            <h2 className="formText">82kg</h2>
          ) : (
            <input type="text" />
          )}
        </div>
        <div className="inputControl">
          <label htmlFor="">Height</label>
          {!isEditing ? (
            <h2 className="formText">1.82</h2>
          ) : (
            <input type="number" />
          )}
        </div>
      </div>
      {isEditing && (
        <div className="mt-4">
          <button className="primaryBtn w-[220px] ml-auto ">Update</button>
        </div>
      )}
    </form>
  );
}
