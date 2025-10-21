import React from "react";
import { CircleArrowOutUpRight } from "lucide-react";
import Link from "next/link";

export default function DashboardCard({
  title,
  value,
  className,
  desc,
  link,
}: {
  title: string;
  value: string | number;
  className?: string;
  desc?: string;
  link: string;
}) {
  return (
    <Link href={link} className={className}>
      <div className="flex items-center justify-between">
        <h2>{title}</h2>
        <CircleArrowOutUpRight size={22} />
      </div>
      <p className="text-2xl font-bold">{value}</p>
      {desc && <p className="text-sm font-bold">{desc}</p>}
    </Link>
  );
}
