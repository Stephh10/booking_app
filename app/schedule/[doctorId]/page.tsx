import React from "react";
import ScheduleDatePicker from "./_components/ScheduleDatePicker";

export default function page() {
  return (
    <div className="container h-screen ">
      <h1 className="text-lg font-bold py-2">AppDoc</h1>
      <div className="sheduleContainer">
        <div>
          <h2 className="text-lg font-bold">Dr. Kevin Johnson</h2>
          <h2 className="text-[var(--text-soft)] font-bold -mt-1">
            Cardiologists
          </h2>
        </div>
        <div>
          <h2 className="text-lg font-bold">
            Browse the available time slots and choose the one that works best
            for you
          </h2>
        </div>
        <div className="scheduleMainWrapper">
          <div className="scheduleMain min-h-[200px]">
            <div className="flex-1">
              <ScheduleDatePicker />
            </div>
            <div className="mainRight flex-1 border-2 border-amber-300">
              <h2>SSS</h2>
            </div>
          </div>
          <div className="inputSection">
            <input type="text" name="" id="" />
            <button>Confirm Appointment</button>
          </div>
        </div>
      </div>
    </div>
  );
}
