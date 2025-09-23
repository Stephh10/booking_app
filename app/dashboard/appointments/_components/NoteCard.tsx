import React from "react";
import { X, Flag } from "lucide-react";

export default function NoteCard() {
  return (
    <div className="p-4 border-2 rounded-xl">
      <div className="flex justify-between items-center mb-1">
        <p className="font-bold text-[var(--btn-primary)]">21.10.2025</p>
        <div className="flex gap-2 justify-between">
          <button>
            <Flag size={20} />
          </button>
          <button>
            <X className="cursor-pointer" size={20} />
          </button>
        </div>
      </div>
      <h2>Note content goes here...</h2>
    </div>
  );
}
