"use client";

import React, { useState } from "react";
import { SquareCheck } from "lucide-react";
import PayPalButton from "@/components/PayPalButton";
import { useTransition } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Plan } from "@prisma/client";

export default function BillingCard({
  plan,
  planType,
}: {
  plan: Plan;
  planType: string;
}) {
  const [planId, setPlanId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function getUserId() {
    if (plan.name == "basic") return null;
    startTransition(async () => {
      try {
        const res = await fetch("/api/paypal/create-subscription", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId: plan.id,
          }),
        });
        const data = await res.json();
        if (data.planId) setPlanId(data.planId);
      } catch (err) {
        console.error("Failed to fetch plan ID", err);
      }
    });
  }

  return (
    <div
      className={`min-h-[500px] relative border flex-1 rounded-md p-2 lg:p-4 flex flex-col justify-between overflow-hidden ${
        plan.name === planType
          ? "bg-[var(--btn-primary)] text-[var(--text)]"
          : ""
      }`}
    >
      {plan.name === planType && (
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

      <h1 className="font-bold text-2xl">{plan.name.toUpperCase()}</h1>
      <p className="text-lg">{plan.description}</p>
      <div className="flex gap-1">
        <h1 className="text-3xl my-4">${plan.priceMonthly}</h1>
        <h1 className="text-2xl my-4 text-[var(--text-soft)] items-end">
          /month
        </h1>
      </div>
      {Array.isArray(plan?.features) &&
        plan.features
          .filter((f): f is string => typeof f === "string")
          .map((feature, index) => (
            <div className="flex items-center gap-2 my-2" key={index}>
              <SquareCheck size={20} />
              <p>{feature}</p>
            </div>
          ))}

      {planId ? (
        <PayPalButton planId={planId} />
      ) : isPending ? (
        <div className="flex items-center justify-center ">
          <Spinner className="size-9 text-center text-[ var(--text)]" />
        </div>
      ) : plan.name === planType ? (
        <button className="w-full py-2 bg-[var(--card)] cursor-pointer text-[var(--text-dark)] rounded-lg mt-4 ">
          Active
        </button>
      ) : (
        plan.id === "basic" && (
          <button
            onClick={getUserId}
            className="w-full py-2 bg-[var(--btn-primary)] cursor-pointer text-[var(--text)] rounded-lg mt-4"
          >
            Upgrade
          </button>
        )
      )}
    </div>
  );
}
