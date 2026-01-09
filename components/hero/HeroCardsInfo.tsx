import React from "react";
import { lpHeroCardData } from "@/lib/landingPage/lp-heroCardData";
import HeroInfoCard from "./HeroInfoCard";
export default function HeroCardsInfo() {
  return (
    <div className="flex flex-col md:flex-row gap-5">
      {lpHeroCardData.map((item, index) => (
        <HeroInfoCard key={index} data={item} />
      ))}
    </div>
  );
}
