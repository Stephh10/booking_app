//CREATES A DATE STRING FROM A DATE OBJECT

export function formatWorkCardDate(date: any) {
  if (typeof date === "string") return date;

  if (!date) return "";

  if (date instanceof Date && isNaN(date.getTime())) return "";

  let hours = date.getHours();
  const minutes = date.getMinutes();

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  const mins = `:${String(minutes).padStart(2, "0")}`;

  return `${hours}${mins}${ampm}`;
}
