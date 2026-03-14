export interface TimeRange {
  dayOfWeek: number;
  startTime: Date;
  endTime: Date;
}

export function formatScheduleTime(
  { startTime, endTime }: TimeRange,
  region: string,
): string {
  const start = new Date(startTime);
  const end = new Date(endTime);

  const isNA = region === "na";

  const format = (date: Date) =>
    date.toLocaleTimeString(isNA ? "en-US" : "en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: isNA,
    });

  return `${format(start)} to ${format(end)}`;
}
