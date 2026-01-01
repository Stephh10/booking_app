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
    <div className="flex flex-col text-center items-center justify-between md:flex-row md:text-left gap-2">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-[var(--text-soft)]">{description}</p>
      </div>
      <div className="w-full md:w-auto flex gap-2 items-center justify-between ">
        {children}
      </div>
    </div>
  );
}
