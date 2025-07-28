import React from "react";
import Link from "next/link";
import { auth } from "@/auth";

export default async function Navigation() {
  const activeUser = await auth();
  console.log(activeUser);
  return (
    <div className="h-[55px] bg-[var(--secondary)] flex items-center justify-between px-2">
      <Link className="font-bold text-lg" href={"/"}>
        BookingSite
      </Link>
      <div>
        <Link href={"/login"}>Login</Link>
      </div>
    </div>
  );
}
