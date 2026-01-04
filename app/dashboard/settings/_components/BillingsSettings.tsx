import React from "react";
import BillingCard from "./BillingCard";
import { Plan } from "@prisma/client";
import { getUserPlan } from "@/app/actions/plans";

export default async function BillingsSettings({ plans }: { plans: Plan[] }) {
  const response = await getUserPlan();

  if (!response.ok) {
    return <div>Error: {response.reason}</div>;
  }
  const { planType, subscription } = response;
  return (
    <div className="mt-3">
      <h1 className="settingsHeader">Billings Settings</h1>
      <div className="flex flex-col md:flex-row gap-4 md:gap-2 lg:gap-4 my-5">
        {plans.map((plan) => (
          <BillingCard key={plan.id} plan={plan} planType={planType} />
        ))}
      </div>
    </div>
  );
}
