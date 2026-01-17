import React from "react";
import { UserRoundPlus } from "lucide-react";

export default function NotificationCard({ data }: any) {
  console.log(data.patient.firstName);
  return (
    <div className="flex gap-1 p-1 relative border-1 border-neutral-400 rounded my-4">
      <div className="flex-shrink-0 flex items-center justify-center min-w-[35px] h-[35px] border bg-[var(--btn-primary)] rounded-md text-amber-50">
        <UserRoundPlus size={26} />
      </div>
      <div className="wrap-break-word">
        <h2 className="font-bold">
          {data.patient.firstName} {data.patient.lastName}
        </h2>
        <p>{data.reason}</p>
        <div className="flex gap-1 my-2">
          <button className="w-[100px] py-1 bg-[var(--card)]  text-dark-50 border-1 border-neutral-700 rounded-lg cursor-pointer">
            Decline
          </button>
          <button className="w-[100px] py-1 bg-[var(--btn-primary)] text-amber-50 rounded-lg cursor-pointer">
            Confirm
          </button>
        </div>
      </div>
      <div className="cardEnd flex gap-1 items-start justify-center absolute right-1">
        <p>10min</p>
        <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
      </div>
    </div>
  );
}
