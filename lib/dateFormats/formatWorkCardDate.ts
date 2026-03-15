//CREATES A DATE STRING FROM A DATE OBJECT

export function formatWorkCardDate(
  date: string | Date | null,
  region: string = "na",
): string {
  if (!date) return "";

  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return typeof date === "string" ? date : "";

  const hours = d.getUTCHours();
  const minutes = d.getUTCMinutes();
  const minutesStr = String(minutes).padStart(2, "0");

  if (region === "na") {
    const ampm = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 === 0 ? 12 : hours % 12;

    return `${hours12}:${minutesStr}${ampm}`;
  }

  const hourStr = String(hours).padStart(2, "0");
  return `${hourStr}:${minutesStr}`;
}
