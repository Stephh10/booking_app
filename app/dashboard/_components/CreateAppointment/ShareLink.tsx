"use client";

import React from "react";
import { Link as LinkIcon } from "lucide-react";
import { toast } from "react-toastify";

export default function ShareLink({ activeUser }: any) {
  function copyLink() {
    const link = `${window.location.origin}/schedule/${activeUser.user.id}`;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast.success("Link copied to clipboard");
      })
      .catch((err) => {
        toast.error("Failed to copy link");
      });
  }
  return (
    <button
      onClick={copyLink}
      className="flex-1 md:w-auto outlineBtn flex items-center justify-center gap-1 cursor-pointer"
    >
      <LinkIcon size={17} />
      Schedule link
    </button>
  );
}
