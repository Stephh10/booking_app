import React from "react";
import { statsIconSvg } from "@/lib/landingPage/lp-statsIcon";

export default function HeroStats() {
  return (
    <div className="flex-1 flex flex-col gap-5">
      <div className="bg-[var(--lp-card)] rounded-lg p-4 text-2xl">
        <div>
          <h2>Today's Appointments</h2>
          <div className="flex justify-between items-center">
            <h2 className="text-4xl">12</h2>
            <div dangerouslySetInnerHTML={{ __html: statsIconSvg }}></div>
          </div>
        </div>
      </div>
      <div className="bg-[var(--lp-card)] rounded-lg p-4 text-2xl">
        <div className="p-2">
          <h2>Total patients in the system</h2>
          <div className="flex items-center justify-between mt-2">
            <p className="text-4xl">6.789 Patients</p>
            <div className="bg-[var(--lp-background)] text-center p-2 rounded-lg">
              <p>Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
