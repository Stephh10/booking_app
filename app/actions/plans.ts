"use server";

import { prisma } from "@/lib/prisma";
import { Plan } from "@prisma/client";
import { auth } from "@/auth";
import { PlanType } from "@prisma/client";
import { SubscriptionStatus } from "@prisma/client";

export const getPlans = async (): Promise<Plan[] | { error: string }> => {
  try {
    const plan = await prisma.plan.findMany({
      orderBy: {
        name: "asc",
      },
    });

    if (!plan) return { error: "Failed to fetch plans" };

    return plan;
  } catch (error) {
    return { error: "Failed to fetch plans" };
  }
};

export async function getSelectedPlan(planId: string) {
  return prisma.plan.findUnique({
    where: { id: planId },
  });
}

export const getUserPlan = async (): Promise<
  | {
      ok: true;
      planType: PlanType;
      subscription: {
        id: string;
        status: SubscriptionStatus;
        currentPeriodEnd: Date | null;
      };
    }
  | {
      ok: false;
      reason: "UNAUTHENTICATED" | "NO_SUBSCRIPTION";
    }
> => {
  const authResult = await auth();
  const activeUser = authResult?.user;

  if (!activeUser) {
    throw new Error("NO_ACTIVE_SUBSCRIPTION");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: activeUser.id,
    },
    include: {
      subscription: true,
    },
  });

  if (!user?.subscription) {
    return {
      ok: false,
      reason: "NO_SUBSCRIPTION",
    };
  }

  return {
    ok: true,
    planType: user.subscription.planType,
    subscription: {
      id: user.subscription.id,
      status: user.subscription.status,
      currentPeriodEnd: user.subscription.currentPeriodEnd,
    },
  };
};
