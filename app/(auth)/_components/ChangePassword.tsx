import React from "react";
import { Mail } from "lucide-react";
import Link from "next/link";

export default function ChangePassword() {
  return (
    <div className="mt-7 flex flex-col items-center">
      <Mail size={50} color="#0c3a66" />
      <h1 className="text-2xl font-bold my-1 text-[var(--lp-primary)]">
        Check your email
      </h1>
      <p className="text-neutral-500">
        We will send you a link to reset your password. Please check your inbox
      </p>
      <Link
        href={"https://mail.google.com"}
        className="w-full bg-[var(--lp-primary)] py-2 text-neutral-50 rounded-lg my-3 cursor-pointer hover:scale-101 transition-all duration-100"
      >
        Open Gmail
      </Link>
      <div className="flex gap-2 text-neutral-500">
        <p>Didn't received the email?</p>
        <button className="font-bold !text-[var(--lp-primary)] cursor-pointer">
          Resend
        </button>
      </div>
    </div>
  );
}
