import React from "react";
import ScheduleMain from "./_components/ScheduleMain";
import { auth } from "@/auth";
import { getUser } from "@/app/actions/user";

export default async function page({
  params,
}: {
  params: { doctorId: string };
}) {
  const { user: activeUser } = (await auth()) ?? {};
  const { doctorId } = await params;
  const doctorData = await getUser(doctorId);

  if (!doctorData) {
    throw new Error("User not found");
  }

  return (
    <ScheduleMain
      doctorData={doctorData}
      doctorId={doctorId}
      activeUser={activeUser?.id}
    />
  );
}
