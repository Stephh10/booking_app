"use client";

import React from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/DatePicker";
import Link from "next/link";
import { useTransition } from "react";
import { getSelectedAppointment } from "@/app/actions/appointments";
import { formatDate } from "@/lib/formatDate";
import { updateSelectedAppointment } from "@/app/actions/appointments";

const fields = [
  { key: "reason", label: "Reason", type: "input" },
  { key: "diagnose", label: "Diagnose", type: "input" },
];

export default function AppDetails({ appId }: { appId: string }) {
  type FormDataKey = keyof typeof formData;
  const [isPending, startTransition] = useTransition();

  const [isEditing, setIsEditing] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const [formData, setFormData] = useState({
    reason: "Reason...",
    diagnose: "Diagnose...",
    date: "Date...",
  });

  const handleChange = (field: FormDataKey, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    startTransition(async () => {
      const result = await getSelectedAppointment(appId);

      if ("error" in result) {
        return;
      }

      setFormData({
        reason: result.reason || "Reason...",
        diagnose: result.diagnose || "Diagnose...",
        date: formatDate(result.date),
      });
    });
  }, [appId]);

  function handleEditApp() {
    startTransition(async () => {
      const response = await updateSelectedAppointment(appId, {
        ...formData,
        date: selectedDate ? selectedDate.toISOString() : undefined,
      });
      setIsEditing(false);
    });
  }

  return (
    <div>
      <div className="grid gap-2">
        {fields.map(({ key, label, type }) => (
          <div key={key} className="grid gap-2 border-b-2 pb-1">
            <Label htmlFor={key}>{label}</Label>
            {isEditing ? (
              type === "textarea" ? (
                <Textarea
                  id={key}
                  className="w-[50%] h-[60px] "
                  placeholder={formData[key as FormDataKey]}
                  onChange={(e) =>
                    handleChange(key as FormDataKey, e.target.value)
                  }
                />
              ) : (
                <Input
                  id={key}
                  className="w-[50%] h-[35px]"
                  placeholder={formData[key as FormDataKey]}
                  onChange={(e) =>
                    handleChange(key as FormDataKey, e.target.value)
                  }
                />
              )
            ) : (
              <p className="h-[35px]">{formData[key as FormDataKey]}</p>
            )}
          </div>
        ))}
        <div className="flex gap-2">
          {!isEditing ? <Label>Date:</Label> : ""}
          {isEditing ? (
            <DatePicker date={selectedDate} setDate={setSelectedDate} />
          ) : (
            <p>{formData.date}</p>
          )}
        </div>

        <div className="flex justify-between mt-1">
          <Link href={"/dashboard"}>Go Back</Link>

          <div className="flex items-center gap-3">
            <button
              className="outlineBtn w-[80px] text-center"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
            {isEditing && (
              <button
                onClick={handleEditApp}
                className="primaryBtn w-[80px] text-center"
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
