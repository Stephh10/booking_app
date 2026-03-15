//TME VALIDATION

export const validateTime = (from: string, to: string): boolean => {
  function parseTime(time: string) {
    if (/^\d{2}:\d{2}$/.test(time)) {
      const [h, m] = time.split(":").map(Number);
      return h * 60 + m;
    }

    const match = time.match(/^(\d{1,2}):(\d{2})(AM|PM)$/);

    if (!match) {
      throw new Error("Invalid time format");
    }

    let [_, h, m, period] = match;
    let hours = Number(h);
    const minutes = Number(m);

    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    return hours * 60 + minutes;
  }
  return parseTime(from) < parseTime(to);
};
