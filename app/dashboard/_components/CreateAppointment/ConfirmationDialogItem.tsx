import React from "react";

export default function ConfirmationDialogItem({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  const displayValue = value?.trim() || "Not Selected";
  return (
    <p>
      <span className="font-bold">{label}: </span>
      {displayValue}
    </p>
  );
}
