"use client";

import React from "react";
import { Link } from "lucide-react";
import { useRouter } from "next/navigation";
import { Patient } from "@prisma/client";

export default function NavSearchItem({ itemData }: { itemData: Patient }) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/dashboard/patient/${itemData.id}`)}
      className="flex justify-between w-full p-2 my-2 border-1 rounded-lg hover:bg-stone-100 cursor-pointer"
    >
      <div>
        <div className="flex gap-1 font-bold">
          <h1>{itemData.firstName}</h1>
          <p>{itemData.lastName}</p>
        </div>
        <div className="text-[var(--text-soft)] flex gap-1">
          <p>{itemData.email}</p>
        </div>
      </div>

      <Link size={20} />
    </div>
  );
}
