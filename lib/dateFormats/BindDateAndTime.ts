export default function combineDateWithTime(date: Date, timeString: string) {
  let hours, minutes;

  const isPM = timeString.includes("PM");
  const timePart = timeString.replace(/AM|PM/, "");

  const [hourStr, minuteStr] = timePart.split(":");

  hours = parseInt(hourStr);
  minutes = parseInt(minuteStr);

  if (isPM && hours !== 12) {
    hours += 12;
  }
  if (!isPM && hours === 12) {
    hours = 0;
  }

  const newDate = new Date(date);
  newDate.setHours(hours);
  newDate.setMinutes(minutes);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);

  return newDate;
}
