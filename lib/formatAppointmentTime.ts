export function formatAppointmentTime(
  date: string | Date,
  duration: number | undefined
): string {
  if (!duration) {
    return "";
  }
  const start =
    typeof date === "string" ? new Date(Date.parse(date)) : new Date(date);

  if (isNaN(start.getTime())) {
    return "Invalid Date";
  }

  const end = new Date(start.getTime() + duration * 60 * 1000);

  const formatTime = (d: Date) =>
    d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  return `${formatTime(start)} to ${formatTime(end)}`;
}
