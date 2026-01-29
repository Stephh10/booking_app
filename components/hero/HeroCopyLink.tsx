"use client";

import React, { useState } from "react";

export default function HeroCopyLink() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(
      `http://localhost:3000/schedule/${process.env.NEXT_PUBLIC_ID}`,
    );
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      window.open(`http://localhost:3000/demo`, "_blank");
    }, 1500);
  }

  return (
    <div className="h-auto md:h-[65px] bg-[var(--lp-card)] flex flex-col md:flex-row items-center justify-between my-5 px-5 py-5 md:py-0 rounded-lg md:-mt-5">
      <h2 className="text-md md:text-xl text-[var(--lp-primary)] text-center md:text-left mb-1 md:mb-0">
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
