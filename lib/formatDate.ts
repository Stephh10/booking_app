import { auth } from "@/auth";

export async function formatDate(dateInput: string | Date) {
  const session = await auth();
  const user = session?.user;

  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  if (isNaN(date.getTime())) {
    return "";
  }

  if (user && user?.region === "na") {
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const time = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return `${day} ${month} ${time}`;
  } else {
    const day = date.getDate();
    const month = date.toLocaleString("en-GB", { month: "short" });
    const hour = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day} ${month} ${hour}:${minutes}h`;
  }
}
