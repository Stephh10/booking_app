"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";

export default function PayPalButton({ planId }: { planId: string }) {
  const [error, setError] = useState<string | null>(null);

  const paypalOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
    vault: true,
    intent: "subscription",
    currency: "USD",
    components: "buttons",
    ...(process.env.NODE_ENV === "development" && { debug: true }),
  };

  const buttonStyle = {
    layout: "vertical" as const,
    label: "subscribe" as const,
    shape: "rect" as const,
    color: "gold" as const,
    height: 40,
    tagline: false,
  };

  return (
    <div>
      {error && (
        <div className="text-red-500 text-sm text-center p-2 bg-red-50 rounded mb-2">
          {error}
        </div>
      )}

      <PayPalScriptProvider options={paypalOptions}>
        <PayPalButtons
          style={buttonStyle}
          createSubscription={(_data, actions) => {
            return actions.subscription.create({
              plan_id: planId,
            });
          }}
          onApprove={async (data, actions) => {
            try {
              console.log("Subscription approved", data.subscriptionID);

              const response = await fetch("/api/paypal/capture-subscription", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  subscriptionId: data.subscriptionID,
                  orderId: data.orderID,
                }),
              });

              if (!response.ok) {
                throw new Error("Failed to capture subscription");
              }

              console.log("Subscription captured on server");
              return actions.redirect("/dashboard");
            } catch (err) {
              console.error("Error capturing subscription:", err);
              setError(" PayPal error: Try again later.");
            }
          }}
          onCancel={() => {
            console.log("User cancelled PayPal subscription");
          }}
          onError={(err) => {
            console.error("PayPal error:", err);
            setError(`PayPal error: ${err.message || "Try again later."}`);
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}
