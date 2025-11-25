"use client";

import React from "react";
import { Info, X } from "lucide-react";
import { useState } from "react";

export default function MainNotification() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div
      className={
        !isOpen ? "hidden" : "bg-[var(--lp-primary)] text-[var(--text)] "
      }
    >
      <div className="lp-container h-[43px] w-full flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Info size={18} />
          <h1>Send your link, simplify scheduling, and save time!</h1>
        </div>
        <div className="actions">
          <button className="cursor-pointer" onClick={() => setIsOpen(false)}>
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
