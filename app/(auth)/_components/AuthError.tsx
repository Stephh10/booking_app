import React from "react";
import { TriangleAlert } from "lucide-react";

export default function AuthError({ message }: { message: String }) {
  return (
    <div className="h-[30px] flex items-center gap-1 bg-red-900/50 backdrop-opacity-20 trans mb-2 px-1 rounded">
      <TriangleAlert size={20} />
      {message}
    </div>
  );
}
