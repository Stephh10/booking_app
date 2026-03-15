export function generateTimeSlots(region: string = "na"): string[] {
  const slots: string[] = [];

  for (let hour = 6; hour <= 23; hour++) {
    if (region === "na") {
      slots.push(formatHour(hour, 0));
      slots.push(formatHour(hour, 30));
    } else {
      slots.push(formatHour24(hour, 0));
      slots.push(formatHour24(hour, 30));
    }
  }

  return slots;
}

function formatHour(hour24: number, minutes: number): string {
  const ampm = hour24 < 12 ? "AM" : "PM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  const minStr = String(minutes).padStart(2, "0");

  return `${hour12}:${minStr}${ampm}`;
}

function formatHour24(hour24: number, minutes: number): string {
  const hourStr = String(hour24).padStart(2, "0");
  const minStr = String(minutes).padStart(2, "0");

  return `${hourStr}:${minStr}`;
}
