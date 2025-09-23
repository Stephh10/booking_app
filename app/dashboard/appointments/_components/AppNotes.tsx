import React from "react";
import NoteCard from "./NoteCard";
import { getNotes } from "@/app/actions/notes";
import CreateNote from "./CreateNote";

export default async function AppNotes({ appId }: { appId: string }) {
  if (!appId) return;
  const data = await getNotes(appId);

  console.log(data);

  return (
    <div>
      <CreateNote appId={appId} />
      <NoteCard />
    </div>
  );
}
