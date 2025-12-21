export const formatAppointmentType = (value?: string) => {
  if (!value) return "First Visit";

  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
