import React from "react";

export default function HeroInfoCard({ data }: { data: any }) {
  return (
    <div className="flex-1 bg-[var(--lp-card)] p-3 rounded-lg">
      <div className="flex gap-2">
        <div dangerouslySetInnerHTML={{ __html: data.svg }} />
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold">{data.title}</h2>
          <p>{data.desc}</p>
        </div>
      </div>
    </div>
  );
}
