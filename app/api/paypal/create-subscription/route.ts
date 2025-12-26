import { NextResponse } from "next/server";
import { getPayPalToken } from "@/lib/paypal";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const userId = "cmirlrhbf0000i34wwfitp3bz";
    const { productId, name, price, interval, subscriberEmail } =
      await req.json();

    // 1️⃣ Validate user
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 400 });

    // 2️⃣ Create PayPal plan (hardcoded minimal working JSON)
    const token = await getPayPalToken();

    const planResponse = await fetch(
      "https://api-m.sandbox.paypal.com/v1/billing/plans",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: "PROD-5PC441360G0657214",
          name: "essential",
          description: "Monthly subscription",
          status: "ACTIVE",
          billing_cycles: [
            {
              frequency: {
                interval_unit: "MONTH",
                interval_count: 1,
              },
              tenure_type: "REGULAR",
              sequence: 1,
              total_cycles: 0,
              pricing_scheme: {
                fixed_price: { value: "10", currency_code: "USD" },
              },
            },
          ],
          payment_preferences: {
            auto_bill_outstanding: true,
            setup_fee: { value: "0", currency_code: "USD" },
            setup_fee_failure_action: "CONTINUE",
            payment_failure_threshold: 3,
          },
        }),
      }
    );

    const planData = await planResponse.json();

    if (!planData.id)
      return NextResponse.json(
        { error: "Failed to create plan", details: planData },
        { status: 500 }
      );

    // const foundSubscription = await prisma.subscription.findMany({
    //   where: { userId },
    // });
    // if (foundSubscription) {
    //   await prisma.subscription.deleteMany({
    //     where: { userId },
    //   });
    // }

    const subscription = await prisma.subscription.upsert({
      where: { userId },
      update: {
        planType: "essential",
        status: "pending",
        paypalSubscriptionId: planData.id,
      },
      create: {
        userId,
        planType: "essential",
        status: "pending",
        paypalSubscriptionId: planData.id,
      },
    });

    // 3️⃣ Save subscription using upsert (avoids P2002)
    // const subscription = await prisma.subscription.upsert({
    //   where: { userId },
    //   update: {
    //     planType: "essential",
    //     status: "pending",
    //     paypalSubscriptionId: planData.id,
    //   },
    //   create: {
    //     userId,
    //     planType: "essential",
    //     status: "pending",
    //     paypalSubscriptionId: planData.id,
    //   },
    // });

    return NextResponse.json({ planId: planData.id });
  } catch (err) {
    console.log(err);
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error", details: err },
      { status: 500 }
    );
  }
}
