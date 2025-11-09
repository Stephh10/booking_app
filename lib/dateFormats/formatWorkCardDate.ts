import { da } from "date-fns/locale";

export function formatWorkCardDate(date: Date) {
  if (!date) return "";

  let hours = date.getHours();
  const minutes = date.getMinutes();

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  // uvijek dodaj minute s paddingom
  const mins = `:${String(minutes).padStart(2, "0")}`;

  return `${hours}${mins}${ampm}`;
}
