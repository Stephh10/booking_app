"use client";

import React from "react";
import { X, Flag, FlagOff } from "lucide-react";
import { Note } from "@/types/note";
import { formatDate } from "@/lib/formatDate";
import { useTransition } from "react";
import { changeNoteFlagState, removeNote } from "@/app/actions/notes";

export default function NoteCard({ note: noteData }: { note: Note }) {
  const [isPending, startTransition] = useTransition();
  if (!noteData) return null;
  const formattedDate = formatDate(noteData.createdAt);

  function changeFlagState() {
    startTransition(() => {
      changeNoteFlagState(noteData.id, !noteData.isFlagged);
    });
  }

  function handleRemoveNote() {
    startTransition(() => {
      removeNote(noteData.id);
    });
  }

  return (
    <div
      className={`p-4 border-2 rounded-xl mb-4 ${
        noteData?.isFlagged ? "bg-[var(--soft-blue)]" : ""
      }`}
    >
      <div className="flex justify-between items-center mb-1">
        <p className="font-bold text-[var(--btn-primary)]">{formattedDate}</p>
        <div className="flex gap-2 justify-between">
          <button className="cursor-pointer" onClick={changeFlagState}>
            {!noteData.isFlagged ? <Flag size={20} /> : <FlagOff size={20} />}
          </button>
          <button onClick={handleRemoveNote} disabled={isPending}>
            <X className="cursor-pointer" size={20} />
          </button>
        </div>
      </div>
      <h2>{noteData.content}</h2>
    </div>
  );
}
