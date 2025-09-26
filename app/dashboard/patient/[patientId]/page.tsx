import React from "react";

export default function page({ params }: { params: { patientId: string } }) {
  return (
    <div>
      <h2>This is patient page</h2>
      <h2>Patient id {params.patientId}</h2>
    </div>
  );
}
