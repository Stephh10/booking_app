"use client";

import React, { useState } from "react";

export default function HeroCopyLink() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText("https://share-yourlink.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="h-[65px] bg-[var(--lp-card)] flex items-center justify-between my-5 px-5 rounded-lg -mt-5">
      <h2 className="text-xl text-[var(--lp-primary)]">
        Share the link with your patients to book an appointment quickly and
        conveniently.
      </h2>
      <div className="flex items-center gap-2 ">
        <div
          className={`p-2 w-[280px] text-center rounded-lg cursor-pointer transition-all duration-600
        ${
          copied
            ? "bg-[var(--lp-primary)] text-[var(--lp-card)]"
            : "bg-[var(--lp-background)]"
        }
      `}
          onClick={handleCopy}
        >
          <p className="transition-opacity duration-300">
            {copied ? "Your link is copied" : "https://share-yourlink.com"}
          </p>
        </div>

        <button onClick={handleCopy} className="lp-navBtn">
          Copy Link
        </button>
      </div>
    </div>
  );
}
