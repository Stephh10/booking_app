export function getSelectedDate(date: Date) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = days[date.getDay()];
  const month = months[date.getMonth()];
  const dayOfMonth = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day} ${month} ${dayOfMonth} ${year}`;
}
