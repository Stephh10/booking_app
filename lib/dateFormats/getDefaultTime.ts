export const getDefaultTime = (slot: "from" | "to"): string => {
  return slot === "from" ? "8:00AM" : "4:00PM";
};
