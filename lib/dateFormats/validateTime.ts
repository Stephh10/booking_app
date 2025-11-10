//TME VALIDATION

export const validateTime = (from: string, to: string): boolean => {
  const parseTime = (time: string) => {
    const match = time.match(/(\d{1,2}):(\d{2})(AM|PM)/i);
    if (!match) throw new Error("Invalid time format");
    let [_, hour, minute, ampm] = match;
    let h = parseInt(hour);
    const m = parseInt(minute);
    if (ampm.toUpperCase() === "PM" && h !== 12) h += 12;
    if (ampm.toUpperCase() === "AM" && h === 12) h = 0;
    return h * 60 + m;
  };
  return parseTime(from) < parseTime(to);
};
