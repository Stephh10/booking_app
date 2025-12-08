interface SlotItem {
  dayOfWeek: number;
  startTime: string | Date;
  endTime: string | Date;
}

//This function will show available time for the each hour in a day
export default function getAvailableTimes(arr: SlotItem[]): string[] {
  const availableTimes: string[] = [];

  arr.forEach((item) => {
    const start = new Date(item.startTime);
    const end = new Date(item.endTime);

    const durationMinutes = (end.getTime() - start.getTime()) / 1000 / 60;

    const formatted = start.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    availableTimes.push(formatted);
  });

  return availableTimes;
}
