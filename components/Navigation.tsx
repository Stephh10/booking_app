import React from "react";
import Link from "next/link";
import { auth } from "@/auth";
import { signOut } from "@/auth";
import { redirect } from "next/navigation";

export default async function Navigation() {
  const activeUser = await auth();
  console.log(activeUser);
  return (
    <div className="h-[55px] bg-[var(--secondary)] flex items-center justify-between px-2">
      <Link className="font-bold text-lg" href={"/"}>
        BookingSite
      </Link>
      <div>
        {activeUser?.user ? (
          <form
            action={async () => {
              "use server";
              await signOut();
              redirect("/");
            }}
          >
            <button className="cursor-pointer">Logout</button>
          </form>
        ) : (
          <Link href={"/login"}>Login</Link>
        )}
      </div>
    </div>
  );
}
