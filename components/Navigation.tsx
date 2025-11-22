import React from "react";
import Link from "next/link";
import { auth } from "@/auth";
import LogoutBtn from "./LogoutBtn";

export default async function Navigation() {
  const activeUser = await auth();

  return (
    <div className="h-[65px] bg-[var(--secondary)] flex items-center justify-between px-2">
      <div className="flex items-center gap-5">
        <Link className="font-bold text-lg font-lg" href={"/"}>
          AppointDoc
        </Link>
        <div className="flex items-center gap-3">
          <Link className="lp-link" href={"/"}>
            Home
          </Link>
          <Link className="lp-link" href={"/"}>
            About
          </Link>
          <Link className="lp-link" href={"/"}>
            Contact
          </Link>
        </div>
      </div>
      <div>
        {activeUser?.user && (
          <Link className="lp-navBtn mr-2" href={"/dashboard"}>
            Dashboard
          </Link>
        )}
        {activeUser?.user ? (
          <LogoutBtn />
        ) : (
          <div className="flex items-center gap-2">
            <Link className="lp-navBtn" href={"/login"}>
              Login
            </Link>
            <Link className="lp-navBtn" href={"/register"}>
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
