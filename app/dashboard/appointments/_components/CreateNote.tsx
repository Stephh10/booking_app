"use client";

import React, { useState } from "react";
import { useTransition } from "react";
import { createNote } from "@/app/actions/notes";

export default function CreateNote({ appId }: { appId: string }) {
  const [noteContent, setNoteContent] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleCreateNote() {
    startTransition(() => {
      createNote({ content: noteContent, appointmentId: appId });
    });
    setNoteContent("");
  }

  return (
    <div className="mb-4 flex items-center border-2 w-[420px] rounded-xl h-[40px]">
      <input
        onChange={(e) => setNoteContent(e.target.value)}
        className="flex-1 h-full pl-[5px] rounded-xl border-none outline-none"
        type="text"
        placeholder="Write a note..."
      />
      <button onClick={handleCreateNote} className="primaryBtn">
        {!isPending ? "Add Note" : "Creating..."}
      </button>
    </div>
  );
}
