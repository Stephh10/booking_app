import React from "react";
import NoteCard from "./NoteCard";
import { getNotes } from "@/app/actions/notes";
import CreateNote from "./CreateNote";

export default async function AppNotes({ appId }: { appId: string }) {
  if (!appId) return;
  const notesData = await getNotes(appId);

  return (
    <div>
      <CreateNote appId={appId} />
      {Array.isArray(notesData) && notesData.length > 0
        ? notesData?.map((note: any) => <NoteCard key={note.id} note={note} />)
        : "No notes found"}
    </div>
  );
}
