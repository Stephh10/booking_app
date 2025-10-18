import React from "react";
import ScheduleMain from "./_components/ScheduleMain";

export default async function page({
  params,
}: {
  params: { doctorId: string };
}) {
  const { doctorId } = await params;
  return <ScheduleMain doctorId={doctorId} />;
}
