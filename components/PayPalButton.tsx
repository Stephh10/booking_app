"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    paypal: any;
  }
}

export default function PayPalButton({ planId }: { planId: string }) {
  useEffect(() => {
    if (!planId) return;

    if (window.paypal) {
      renderButton();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&vault=true&intent=subscription&debug=true&currency=USD`;
    script.async = true;

    script.onload = renderButton;

    document.body.appendChild(script);

    function renderButton() {
      window.paypal
        .Buttons({
          createSubscription: (_data: any, actions: any) => {
            return actions.subscription.create({
              plan_id: planId,
            });
          },
          onApprove: (data: any) => {
            console.log("Subscription approved", data);
          },
          onError: (err: any) => {
            console.error("PayPal error", err);
          },
        })
        .render("#paypal-button-container");
    }
  }, [planId]);

  return <div id="paypal-button-container" />;
}
