import React from "react";
import BillingCard from "./BillingCard";
import { auth } from "@/auth";

const plans = [
  {
    id: 2,
    name: "Affordable",
    price: "9.99",
    active: false,
    description: "A flexible plan for growing medical practices.",
    features: [
      "Up to 100 patients",
      "Unlimited appointments",
      "Advanced link sharing",
      "Advanced patient history",
    ],
  },
  // {
  //   id: 1,
  //   name: "Basic",
  //   price: "0",
  //   active: true,
  //   description: "A simple plan for essential patient management.",
  //   features: [
  //     "Up to 50 appointments per month",
  //     "Basic patient history",
  //     "Basic link sharing",
  //     "Limited availability settings",
  //   ],
  // },
  // {
  //   id: 3,
  //   name: "Premium",
  //   price: "15.99",
  //   active: false,
  //   description: "A full-featured plan for advanced modern digital clinics.",
  //   features: [
  //     "Unlimited patients",
  //     "Unlimited appointments",
  //     "Advanced link sharing",
  //     "Priority support",
  //   ],
  // },
];
export default function BillingsSettings() {
  return (
    <div className="mt-3">
      <h1 className="settingsHeader">Billings Settings</h1>
      <div className="flex gap-2 lg:gap-4 my-5">
        {plans.map((plan) => (
          <BillingCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
}
