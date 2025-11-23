import React from "react";
import HeroCopyLink from "./HeroCopyLink";
import HeroCardsInfo from "./HeroCardsInfo";

export default function Hero() {
  return (
    <div className="heroWrapper min-h-[330px] flex flex-col justify-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl lg:text-6xl font-bold text-[var(--lp-primary)] leading-tight">
          Manage your patients <br /> easily and effectively
        </h1>
        <p className="text-xl">
          Visits, records, scheduling and statistics - all in one place.
        </p>
      </div>
      <HeroCopyLink />
      <HeroCardsInfo />
    </div>
  );
}
