"use client";

import React from "react";
import Avatar from "@/components/Avatar";

export default function GeneralAvatar() {
  return (
    <div className="flex gap-3 items-center my-3">
      <Avatar src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D" />
      <div>
        <button className="bg-[var(--btn-primary)]  text-[var(--text)] w-[120px] border-2 py-1 rounded-lg cursor-pointer">
          Change
        </button>
      </div>
    </div>
  );
}
