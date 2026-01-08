import React from "react";

export default function About() {
  return (
    <section id="about" className="my-4  flex flex-col gap-4 p-5">
      <div className="flex items-center h-[350px] gap-4 ">
        <div className="flex-1">
          <h4 className="font-bold">Home / About Us</h4>
          <h1 className="text-3xl font-bold mb-2 text-[var(--lp-primary)]">
            Crafting Excellence Togeather
          </h1>
          <p>
            At AppointDoc, we make healthcare scheduling simple and efficient.
            Our platform helps doctors manage appointments, communicate with
            patients, and optimize their workflow all in one place. By combining
            smart scheduling, automated reminders, and real-time calendar
            integration, we reduce no-shows and save valuable time.
          </p>
        </div>
        <div className="flex-1 h-full rounded-lg overflow-hidden ">
          <img
            className="h-full w-full"
            src="/login-image.jpg"
            alt="About Us"
          />
        </div>
      </div>

      <div className="flex items-center h-[350px] gap-4">
        <div className="flex-1 rounded-lg overflow-hidden h-full">
          <img
            className="h-full w-full"
            src="/lp-mission.jpg"
            alt="Our Mission"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2 text-[var(--lp-primary)]">
            Our Mission
          </h1>
          <p>
            To empower healthcare professionals with smart, seamless, and
            efficient tools that simplify patient scheduling, enhance
            communication, and improve overall patient care. We strive to make
            healthcare more accessible, organized, and personalized for both
            doctors and patients
          </p>
        </div>
      </div>
    </section>
  );
}
