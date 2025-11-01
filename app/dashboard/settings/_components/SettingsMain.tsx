"use client";

import React from "react";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneralSettings from "./GeneralSettings";
import { useEditSettings } from "@/store/useEditSettings";

export default function SettingsMain() {
  const { isEditing, setIsEditing } = useEditSettings();

  return (
    <>
      <PageHeader title="Settings" description="Manage your account settings.">
        {isEditing ? (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="w-[120px] border-1 py-1 rounded-lg cursor-pointer"
            >
              Cancel
            </button>
            <button className="bg-[var(--btn-primary)]  text-[var(--text)] w-[120px] border-2 py-1 rounded-lg cursor-pointer">
              Save
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-[var(--btn-primary)]  text-[var(--text)] w-[120px] border-2 py-1 rounded-lg cursor-pointer"
          >
            Edit
          </button>
        )}
      </PageHeader>
      <div className="mt-4 2 bg-[var(--secondary)] p-4 rounded-2xl">
        <Tabs className="w-full" defaultValue={"general"}>
          <TabsList className="w-full flex border-1 p-0">
            <TabsTrigger
              className="menuTab
                 data-[state=active]:bg-[var(--btn-primary)] 
                 data-[state=active]:text-white"
              value="general"
            >
              General
            </TabsTrigger>
            <TabsTrigger
              className="menuTab
                 data-[state=active]:bg-[var(--btn-primary)] 
                 data-[state=active]:text-white"
              value="preferences"
            >
              Preferences
            </TabsTrigger>
            <TabsTrigger
              className="menuTab
                 data-[state=active]:bg-[var(--btn-primary)] 
                 data-[state=active]:text-white "
              value="work-time"
            >
              Work Time
            </TabsTrigger>
            <TabsTrigger
              className="menuTab
                 data-[state=active]:bg-[var(--btn-primary)] 
                 data-[state=active]:text-white "
              value="account"
            >
              Account
            </TabsTrigger>
            <TabsTrigger
              className="menuTab
                 data-[state=active]:bg-[var(--btn-primary)] 
                 data-[state=active]:text-white "
              value="billings"
            >
              Billings
            </TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <GeneralSettings />
          </TabsContent>
          <TabsContent value="preferences">
            <h2>Preferences</h2>
          </TabsContent>
          <TabsContent value="work-time">
            <h2>Work Time</h2>
          </TabsContent>
          <TabsContent value="account">
            <h2>Account</h2>
          </TabsContent>
          <TabsContent value="billings">
            <h2>Billings</h2>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
