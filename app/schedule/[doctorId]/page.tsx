import React from "react";

export default function page() {
  return (
    <div className="container h-screen">
      <h1 className="text-lg font-bold py-2">AppDoc</h1>
      <div className="sheduleContainer">
        <div>
          <h2>Dr Kevin </h2>
          <h2>Cardiologists</h2>
        </div>
        <div>
          <h2>Select available time</h2>
        </div>
        <div className="scheduleMainWrapper">
          <div className="scheduleMain">
            <div className="mainLeft"></div>
            <div className="mainRight"></div>
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
