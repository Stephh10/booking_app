"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const data = [
  { day: "Sun", patients: 5 },
  { day: "Mon", patients: 11 },
  { day: "Tue", patients: 10 },
  { day: "Wed", patients: 12 },
  { day: "Thu", patients: 17 },
  { day: "Fri", patients: 15 },
  { day: "Sat", patients: 22 },
];

export default function HeroChart() {
  return (
    <div
      className="relative max-w-[580px] bg-[var(--lp-card)]"
      style={{
        height: "300px",
        width: "100%",
        borderRadius: 12,
        padding: "12px",
      }}
    >
      <div className="absolute top-4 left-20">
        <h2 className="text-2xl">New patients - this week</h2>
        <p className="text-4xl">92</p>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="patients"
            stroke="#1f5f99"
            strokeWidth={4}
            fill="#ddeaf7"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
