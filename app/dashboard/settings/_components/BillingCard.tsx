import React from "react";
import { SquareCheck } from "lucide-react";

export default function BillingCard({ plan }: any) {
  return (
    <div
      className={`relative border flex-1 rounded-md p-2 lg:p-4 flex flex-col justify-between overflow-hidden ${
        plan.active ? "bg-[var(--btn-primary)] text-[var(--text)]" : ""
      }`}
    >
      {plan.active && (
        <div className="absolute flex top-[2px] -right-[5px] -mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            className="w-64 h-64 text-white"
            style={{ opacity: 0.08 }}
            fill="currentColor"
          >
            <path d="M14.33 8l-1.876-4.377-3.438 9.783-4.015-13.11-2.37 7.704h-2.631v1h3.369l1.63-5.296 3.95 12.903 3.597-10.23 1.124 2.623h3.33v-1z" />
          </svg>
        </div>
      )}

      <h1 className="font-bold text-2xl">{plan.name}</h1>
      <p className="text-lg">{plan.description}</p>
      <div className="flex gap-1">
        <h1 className="text-3xl my-4">${plan.price}</h1>
        <h1 className="text-2xl my-4 text-[var(--text-soft)] items-end">
          /month
        </h1>
      </div>
      {plan.features.map((feature: string, index: number) => (
        <div className="flex items-center gap-2 my-2" key={index}>
          <SquareCheck size={20} />
          <p>{feature}</p>
        </div>
      ))}
      <button
        className={`w-full  py-2 rounded-lg cursor-pointer mt-4 text-lg font-bold ${
          plan.active
            ? "bg-[var(--text)] text-[var(--btn-primary)]"
            : " bg-[var(--btn-primary)] text-[var(--text)]"
        }`}
      >
        {plan.active ? "Current Plan" : "Select Plan"}
      </button>
    </div>
  );
}
