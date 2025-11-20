import React from "react";
import { useRouter } from "next/navigation";

export default function UpgradeAccount() {
  const router = useRouter();
  return (
    <div>
      <h1 className="settingsHeader">Upgrade to Premium</h1>
      <div className="flex items-center justify-between gap-7 lg:gap-20">
        <div className="flex-1">
          <p className="text-[var(--text-soft)]">
            Unlock the full potential of your dashboard with Premium access.
            Premium features provide advanced analytics, priority support, and
            enhanced patient management tools designed to help you save time and
            deliver better care.
          </p>
          <p className="text-[var(--text-soft)]">
            With Premium, you can track patient outcomes more effectively,
            access detailed reports, and receive notifications tailored to your
            workflow. Experience a smarter, more efficient way to manage your
            practice.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => router.push(`/dashboard/settings?view=billings`)}
            className="bg-[var(--btn-primary)] text-[var(--text)] w-[120px] border-2 py-2 rounded-lg cursor-pointer"
          >
            Upgrade Now
          </button>
          <button className="bg-inherit text-[var(--dark)] w-[120px] border-2 py-2 rounded-lg cursor-pointer">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
