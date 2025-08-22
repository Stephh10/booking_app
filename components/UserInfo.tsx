import React from "react";

export default function UserInfo({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between bg-[var(--secondary)] p-4 rounded-xl mb-2 border-b-2">
      <div>
        <h2 className="text-xl font-bold">Kevin Punter</h2>
        <div className="flex items-center gap-4 ">
          <p>ID: #12333</p>
          <p>Phone: 234234324234</p>
          <p>Email: kev@gmail.com</p>
        </div>
      </div>
      {children}
    </div>
  );
}
