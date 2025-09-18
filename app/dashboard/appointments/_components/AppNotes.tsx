import React from "react";
import NoteCard from "./NoteCard";

export default function AppNotes() {
  return (
    <div>
      <div className="mb-4 flex items-center border-2 w-[420px] rounded-xl h-[40px]">
        <input
          className="flex-1 h-full pl-[5px] rounded-xl border-none outline-none"
          type="text"
          placeholder="Write a note..."
        />
        <button className="primaryBtn">Add Note</button>
      </div>
      <NoteCard />
    </div>
  );
}
