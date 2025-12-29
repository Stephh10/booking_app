"use client";

import React from "react";
import { useEditSettings } from "@/store/useEditSettings";
import { useSearchParams } from "next/navigation";

export default function SettingsEditingBtn() {
  const { isEditing, setIsEditing, handleSubmit } = useEditSettings();

  const searchParams = useSearchParams();
  const view = searchParams.get("view");

  return (
    <>
      {(!view || view === "account") &&
        (isEditing ? (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="w-[120px] border-1 py-1 rounded-lg cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSubmit()}
              className="bg-[var(--btn-primary)] text-[var(--text)] w-[120px] border-2 py-1 rounded-lg cursor-pointer"
            >
              Save
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-[var(--btn-primary)] text-[var(--text)] w-[120px] border-2 py-1 rounded-lg cursor-pointer"
          >
            Edit
          </button>
        ))}
    </>
  );
}
