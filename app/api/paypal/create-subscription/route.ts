import { NextResponse } from "next/server";
import { getPayPalToken } from "@/lib/paypal";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { getSelectedPlan } from "@/app/actions/plans";

export async function POST(req: Request) {
  try {
    const authResult = await auth();
    const activeUser = authResult?.user;

    if (!activeUser) {
      return NextResponse.json(
        { error: "You are not authenticated" },
        { status: 401 }
      );
    }

    const { id: userId } = activeUser;
    const { productId } = await req.json();
    const selectedPlan = await getSelectedPlan(productId);

    if (!selectedPlan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    if (selectedPlan.name === "basic") return;

    //user validation
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 400 });

    // pay pal plan
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
          product_id: selectedPlan.id,
          name: selectedPlan.name,
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

    return NextResponse.json({ planId: planData.id });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error", details: err },
      { status: 500 }
    );
  }
}
