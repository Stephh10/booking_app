import React from "react";
import ScheduleMain from "./_components/ScheduleMain";
import { auth } from "@/auth";

export default async function page({
  params,
}: {
  params: { doctorId: string };
}) {
  const { user: activeUser } = (await auth()) ?? {};
  const { doctorId } = await params;

  return <ScheduleMain doctorId={doctorId} activeUser={activeUser?.id} />;
}
