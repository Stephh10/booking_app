import { NextResponse } from "next/server";
import { getPayPalToken } from "@/lib/paypal";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { userId, productId, name, price, interval, subscriberEmail } =
    await req.json();

  const token = await getPayPalToken();

  const planResponse = await fetch(
    `https://api-m.sandbox.paypal.com/v1/billing/plans`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        product_id: productId,
        name,
        description: "Monthly subscription",
        status: "ACTIVE",
        billing_cycles: [
          {
            frequency: {
              interval_unit: interval,
              interval_count: 1,
            },
            tenure_type: "REGULAR",
            sequence: 1,
            total_cycles: 0,
            pricing_scheme: {
              fixed_price: {
                currency_code: "USD",
                value: price,
              },
            },
          },
        ],
      }),
    }
  );

  const planData = await planResponse.json();

  const subRes = await fetch(
    "https://api-m.sandbox.paypal.com/v1/billing/subscriptions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "PayPal-Request-Id": `sub-${Date.now()}`,
      },
      body: JSON.stringify({
        plan_id: planData.id,
        subscriber: { email_address: subscriberEmail },
        application_context: {
          brand_name: "Moja Platforma",
          return_url: "https://localhost:3000/dashboard",
          cancel_url: "https://localhost:3000/dashboard",
        },
      }),
    }
  );
  const subData = await subRes.json();

  const subscription = await prisma.subscription.create({
    data: {
      userId,
      planType: "essential",
      status: "pending",
      paypalSubscriptionId: subData.id,
      currentPeriodStart: subData.billing_info?.next_billing_time
        ? new Date(subData.billing_info.next_billing_time)
        : null,
      currentPeriodEnd: subData.billing_info?.cycle_executions?.[0]
        ?.tenure_end_time
        ? new Date(subData.billing_info.cycle_executions[0].tenure_end_time)
        : null,
    },
  });

  return NextResponse.json(subscription);
}
