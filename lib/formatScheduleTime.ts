export interface TimeRange {
  dayOfWeek: number;
  startTime: Date;
  endTime: Date;
}

export function formatScheduleTime({ startTime, endTime }: TimeRange): string {
  const start = new Date(startTime);
  const end = new Date(endTime);

  const format = (date: Date) =>
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  return `${format(start)} to ${format(end)}`;
}
