"use client";

import React from "react";
import { DialogDeleteAccount } from "./DialogDeleteAccount";
import { useState } from "react";

export default function DeleteAccountSettings() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h1 className="settingsHeader">Delete Account</h1>
      <div className="flex flex-col md:flex-row items-center justify-between gap-7 lg:gap-20">
        <div className="flex-1">
          <p className="text-[var(--text-soft)]">
            By deleting your account, all your personal data, preferences, and
            history will be permanently removed from our system. This action
            cannot be undone immediately. Once your account deletion is
            requested,{" "}
            <span className="text-[var(--btn-primary)] font-bold">
              you will have 15 days
            </span>{" "}
            to reverse this action before all content, subscriptions, and
            associated services are permanently removed.
          </p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button
            onClick={() => setIsOpen(true)}
            className="flex-1 md:w-[120px] bg-red-500 text-[var(--text)] border-2 py-2 rounded-lg cursor-pointer"
          >
            Delete Account
          </button>
          <button className="flex-1 md:w-[120px] bg-inherit text-[var(--dark)]  border-2 py-2 rounded-lg cursor-pointer">
            Learn More
          </button>
        </div>
      </div>
      <DialogDeleteAccount isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
