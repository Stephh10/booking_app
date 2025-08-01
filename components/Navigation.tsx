import React from "react";
import Link from "next/link";
import { auth } from "@/auth";
import LogoutBtn from "./LogoutBtn";

export default async function Navigation() {
  const activeUser = await auth();

  return (
    <div className="h-[55px] bg-[var(--secondary)] flex items-center justify-between px-2">
      <Link className="font-bold text-lg" href={"/"}>
        BookingSite
      </Link>
      <div>
        {activeUser?.user ? <LogoutBtn /> : <Link href={"/login"}>Login</Link>}
      </div>
    </div>
  );
}
