"use client";
import React from "react";
import { signOut } from "next-auth/react";

export default function LogoutBtn() {
  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };
  return (
    <button className="cursor-pointer" onClick={handleLogout}>
      Logout
    </button>
  );
}
