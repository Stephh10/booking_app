export function formatAppointmentDate(date: string | Date): string {
  const parsedDate = typeof date === "string" ? new Date(date) : new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    console.error("Invalid date provided:", date);
    return "Invalid Date";
  }

  return parsedDate.toLocaleDateString("en-US", {
    timeZone: "America/New_York",
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
}
