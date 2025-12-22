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
        console.error(err);
      });
  }
  return (
    <button
      onClick={copyLink}
      className="outlineBtn flex items-center justify-center gap-1"
    >
      <LinkIcon size={17} />
      Schedule link
    </button>
  );
}
