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
  { day: "Mon", patients: 10 },
  { day: "Tue", patients: 14 },
  { day: "Wed", patients: 12 },
  { day: "Thu", patients: 16 },
  { day: "Fri", patients: 15 },
  { day: "Sat", patients: 22 },
];

export default function HeroChart() {
  return (
    <div
      className="max-w-[580px] bg-[var(--lp-card)]"
      style={{
        height: "300px",
        width: "100%",
        borderRadius: 12,
        padding: "12px",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        {/* <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#C9D8E6" />
          <XAxis dataKey="day" stroke="#3E7EB6" tickMargin={10} />
          <YAxis hide />
          <Tooltip
            contentStyle={{
              background: "white",
              border: "1px solid #C9D8E6",
              borderRadius: 8,
              color: "#3E7EB6",
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3E7EB6"
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2, stroke: "#3E7EB6", fill: "white" }}
            activeDot={{ r: 6 }}
          />
        </LineChart> */}
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="patients"
            stroke="#1f5f99"
            strokeWidth={3}
            fill="#ddeaf7"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
