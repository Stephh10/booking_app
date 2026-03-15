//conve
export function parseToIsoTime(timeStr: string | Date) {
  if (!timeStr) return "";

  if (timeStr instanceof Date) {
    return timeStr.toISOString();
  }

  let hours: number;
  let minutes: number;

  //US FORMAT
  const match12 = timeStr.match(/^(\d{1,2}):(\d{2})(AM|PM)$/i);
  if (match12) {
    let [_, hourStr, minuteStr, ampm] = match12;
    hours = parseInt(hourStr, 10);
    minutes = parseInt(minuteStr, 10);

    const isPM = ampm.toUpperCase() === "PM";
    if (hours === 12) {
      hours = isPM ? 12 : 0;
    } else {
      hours = isPM ? hours + 12 : hours;
    }
  } else {
    //EU FORMAT
    const match24 = timeStr.match(/^(\d{2}):(\d{2})$/);
    if (!match24) return "";
    hours = parseInt(match24[1], 10);
    minutes = parseInt(match24[2], 10);
  }

  const now = new Date();
  const yyyy = now.getUTCFullYear();
  const mm = now.getUTCMonth();
  const dd = now.getUTCDate();

  const utcDate = new Date(Date.UTC(yyyy, mm, dd, hours, minutes, 0));
  return utcDate.toISOString();
}
