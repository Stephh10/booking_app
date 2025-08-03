import React from "react";
import { CircleArrowOutUpRight } from "lucide-react";

export default function DashboardCard({
  title,
  value,
  className,
  desc,
}: {
  title: string;
  value: string | number;
  className?: string;
  desc?: string;
}) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <h2>{title}</h2>
        <CircleArrowOutUpRight size={22} />
      </div>
      <p className="text-2xl font-bold">{value}</p>
      {desc && <p className="text-sm font-bold">{desc}</p>}
    </div>
  );
}
