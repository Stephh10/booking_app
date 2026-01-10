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
      <div className="flex flex-col-reverse md:flex-row items-center gap-5">
        <div className="flex flex-col justify-center gap-2 min-h-[220px] -mt-7">
          <h1 className="text-4xl lg:text-6xl font-bold text-[var(--lp-primary)] leading-tight text-center md:text-left">
            Manage your patients <br /> easily and effectively
          </h1>
          <p className="text-xl text-center md:text-left">
            Visits, records, scheduling and statistics - all in one place.
          </p>
          <button className="lp-navBtn bg-[var(--lp-primary)] w-full sm:w-[120px] md:w-[220px] my-3">
            Explore
          </button>
        </div>
        <div className="flex items-center justify-center ">
          <Lottie
            className="w-[350px] h-[350px] md:w-[450px] md:h-[450px] -mt-15 md:m-0"
            style={{ background: "transparent" }}
            animationData={animationData}
            loop
            autoplay
          />
        </div>
      </div>
      <HeroCopyLink />
      <div className="heroStats flex flex-col md:flex-row gap-5 mb-5">
        <HeroChart />
        <HeroStats />
      </div>
      <HeroCardsInfo />
    </div>
  );
}
