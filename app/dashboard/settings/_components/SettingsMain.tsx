"use client";

import React from "react";
import PageHeader from "@/components/PageHeader";

import { useEditSettings } from "@/store/useEditSettings";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import TabList from "./TabList";

import { User, ProfileImage } from "@prisma/client";

export default function SettingsMain({
  userData,
}: {
  userData: User & { profileImage?: ProfileImage | null };
}) {
  const { isEditing, setIsEditing, handleSubmit } = useEditSettings();
  const router = useRouter();

  const searchParams = useSearchParams();
  const view = searchParams.get("view");

  return (
    <>
      <PageHeader title="Settings" description="Manage your account settings.">
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
      </PageHeader>
      <div className="mt-4 2 bg-[var(--secondary)] p-4 rounded-2xl">
        <TabList />
      </div>
    </>
  );
}
