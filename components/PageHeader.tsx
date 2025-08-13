import React, { ReactNode } from "react";
type PageHeaderProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export default function PageHeader({
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-[var(--text-soft)]">{description}</p>
      </div>
      <div className="flex gap-2 items-center">{children}</div>
    </div>
  );
}
