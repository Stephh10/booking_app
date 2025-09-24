"use client";

import React from "react";
import { X, Flag } from "lucide-react";
import { Note } from "@/types/note";
import { formatDate } from "@/lib/formatDate";
import { useTransition } from "react";

export default function NoteCard({ note: noteData }: { note: Note }) {
  if (!noteData) return null;
  const formattedDate = formatDate(noteData.createdAt);

  function changeFlagState() {}

  return (
    <div className="p-4 border-2 rounded-xl mb-4">
      <div className="flex justify-between items-center mb-1">
        <p className="font-bold text-[var(--btn-primary)]">{formattedDate}</p>
        <div className="flex gap-2 justify-between">
          <button className="cursor-pointer" onClick={changeFlagState}>
            <Flag size={20} />
          </button>
          <button>
            <X className="cursor-pointer" size={20} />
          </button>
        </div>
      </div>
      <h2>{noteData.content}</h2>
    </div>
  );
}
