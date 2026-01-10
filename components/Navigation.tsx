import React from "react";
import Link from "next/link";
import { auth } from "@/auth";
import LogoutBtn from "./LogoutBtn";

export default async function Navigation() {
  const activeUser = await auth();

  return (
    <div className="bg-[var(--secondary)]">
      <div className="lp-container h-[65px] flex items-center justify-between">
        <div className="flex items-center">
          <Link
            className="font-bold text-lg font-lg w-[180px] mt-3 -ml-9 md:-ml-7"
            href={"/"}
          >
            <img src="/logo.png" alt="logo" />
          </Link>
          <div className="flex items-center gap-3">
            <Link className="lp-link" href={"#hero"}>
              Home
            </Link>
            <Link className="lp-link" href={"#about"}>
              About
            </Link>
            <Link className="lp-link" href={"#contact"}>
              Contact
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {activeUser?.user && (
            <Link
              href="/dashboard"
              className="lp-navBtn inline-block cursor-pointer hoverScale"
            >
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
                Explore
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
