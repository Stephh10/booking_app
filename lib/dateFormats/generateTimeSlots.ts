export function generateTimeSlots(): string[] {
  const slots: string[] = [];

  for (let hour = 6; hour <= 23; hour++) {
    slots.push(formatHour(hour, 0));

    slots.push(formatHour(hour, 30));
  }

  return slots;
}

function formatHour(hour24: number, minutes: number): string {
  const ampm = hour24 < 12 ? "AM" : "PM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  const minStr = String(minutes).padStart(2, "0");

  return `${hour12}:${minStr}${ampm}`;
}
