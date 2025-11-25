"use client";

import React from "react";
import HeroCopyLink from "./HeroCopyLink";
import HeroCardsInfo from "./HeroCardsInfo";
import HeroChart from "./HeroChart";
import HeroStats from "./HeroStats";
import Lottie from "lottie-react";
import animationData from "@/public/animations/hero-animation.json";

export default function Hero() {
  return (
    <div className="heroWrapper min-h-[330px] flex flex-col justify-center">
      <div className="flex items.center gap-5">
        <div className="flex flex-col justify-center gap-2 min-h-[220px] -mt-7">
          <h1 className="text-4xl lg:text-6xl font-bold text-[var(--lp-primary)] leading-tight">
            Manage your patients <br /> easily and effectively
          </h1>
          <p className="text-xl">
            Visits, records, scheduling and statistics - all in one place.
          </p>
          <button className="lp-navBtn w-[220px] my-3">Explore</button>
        </div>
        <div className="flex items-center justify-center ">
          <Lottie
            className="w-[450px] h-[450px]"
            style={{ background: "transparent" }}
            animationData={animationData}
            loop
            autoplay
          />
        </div>
      </div>
      <HeroCopyLink />
      <div className="heroStats flex gap-5 mb-5">
        <HeroChart />
        <HeroStats />
      </div>
      <HeroCardsInfo />
    </div>
  );
}
