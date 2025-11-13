//conve
export function parseToIsoTime(timeStr: string | Date) {
  if (!timeStr) return "";

  if (timeStr instanceof Date) {
    return timeStr.toISOString();
  }

  const match = timeStr.match(/^(\d{1,2}):(\d{2})(AM|PM)$/i);
  if (!match) return "";

  let [_, hourStr, minuteStr, ampm] = match;

  let hours = parseInt(hourStr, 10);
  const minutes = parseInt(minuteStr, 10);

  const isPM = ampm.toUpperCase() === "PM";

  if (hours === 12) {
    hours = isPM ? 12 : 0;
  } else {
    hours = isPM ? hours + 12 : hours;
  }

  const now = new Date();
  const yyyy = now.getUTCFullYear();
  const mm = now.getUTCMonth();
  const dd = now.getUTCDate();

  const utcDate = new Date(Date.UTC(yyyy, mm, dd, hours, minutes, 0));

  return utcDate.toISOString();
}
