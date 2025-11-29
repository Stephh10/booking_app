"use client";

import React, { useTransition, useState, useEffect } from "react";
import { Mail } from "lucide-react";
import Link from "next/link";
import { sendForgotPasswordEmail } from "@/app/actions/user";
import { useRouter } from "next/navigation";

interface ChangePasswordProps {
  email?: string;
}

export default function ChangePassword({ email }: ChangePasswordProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [sentOnce, setSentOnce] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Automatski pošalji email kada komponenta mountuje
  useEffect(() => {
    if (email && !sentOnce) {
      handleEmailSend();
    }
  }, [email]);

  const handleEmailSend = () => {
    if (!email || sentOnce) return;

    setError(null);

    startTransition(async () => {
      try {
        const response = await sendForgotPasswordEmail(email);

        if ("error" in response) {
          return;
        }

        setSentOnce(true);
        console.log("Reset link:", response.resetLink);
      } catch (err) {
        console.error(err);
        setError("Failed to send email. Try again later.");
      }
    });
  };

  return (
    <div className="mt-7 flex flex-col items-center">
      <Mail size={50} color="#0c3a66" />
      <h1 className="text-2xl font-bold my-1 text-[var(--lp-primary)]">
        Check your email
      </h1>
      <p className="text-neutral-500 text-center">
        We will send you a link to reset your password. Please check your inbox.
      </p>

      <Link
        href={"https://mail.google.com"}
        className="w-full bg-[var(--lp-primary)] py-2 text-neutral-50 rounded-lg my-3 cursor-pointer hover:scale-101 transition-all duration-100 text-center"
      >
        Open Gmail
      </Link>

      <div className="flex flex-col gap-2 text-neutral-500 items-center">
        <div className="flex gap-2">
          <p>Didn't receive the email?</p>
          <button
            onClick={handleEmailSend}
            className="font-bold !text-[var(--lp-primary)] cursor-pointer disabled:opacity-50"
            disabled={isPending || sentOnce}
          >
            {isPending ? "Sending..." : sentOnce ? "Sent" : "Resend"}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
}
