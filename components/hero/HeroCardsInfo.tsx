import React from "react";

export default function HeroCardsInfo() {
  return (
    <div>
      <div>
        <div>
          <svg
            width="80"
            height="100"
            viewBox="0 0 80 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="bgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#E8F1FF" />
                <stop offset="100%" stop-color="#C8DBFF" />
              </linearGradient>
            </defs>

            <rect
              x="10"
              y="10"
              width="60"
              height="80"
              rx="10"
              fill="url(#bgGradient)"
              stroke="#1A59CC"
              stroke-width="3"
            />

            <line
              x1="25"
              y1="40"
              x2="55"
              y2="40"
              stroke="#1A59CC"
              stroke-width="4"
              stroke-linecap="round"
            />
            <line
              x1="25"
              y1="55"
              x2="55"
              y2="55"
              stroke="#1A59CC"
              stroke-width="4"
              stroke-linecap="round"
            />
            <line
              x1="25"
              y1="70"
              x2="55"
              y2="70"
              stroke="#1A59CC"
              stroke-width="4"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <h2>Visit records</h2>
        <p>Track all dates and diagnoses in one place</p>
      </div>
    </div>
  );
}
