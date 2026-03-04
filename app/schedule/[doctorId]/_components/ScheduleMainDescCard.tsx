import React from "react";
import { LucideIcon } from "lucide-react";

export default function ScheduleMainDescCard({
  title,
  desc,
  icon: Icon,
}: {
  title: string;
  desc: string;
  icon: LucideIcon;
}) {
  return (
    <li className="my-2 border border-neutral-300 p-1 rounded">
      <div className="flex gap-2 items-center">
        <Icon size={22} />
        <h2 className="font-bold">{title}</h2>
      </div>
      <p className="text-[15px]">{desc}</p>
    </li>
  );
}
