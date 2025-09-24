export function formatDate(dateInput: string | Date): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  if (isNaN(date.getTime())) {
    return "";
  }

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" }); // "Sep"
  const year = date.getFullYear().toString().slice(-2); // "25"
  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }); // "10:30 AM"

  return `${day} ${month} ${year} ${time}`;
}
