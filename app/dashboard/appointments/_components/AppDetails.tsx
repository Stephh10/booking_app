"use client";

import React from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/DatePicker";
import Link from "next/link";
import { useTransition } from "react";
import { getSelectedAppointment } from "@/app/actions/appointments";
import { Appointment } from "@/types/appointment";

const fields = [
  { key: "title", label: "Title", type: "input" },
  { key: "diagnose", label: "Diagnose", type: "input" },
  { key: "notes", label: "Notes", type: "input" },
];

export default function AppDetails({ appId }: { appId: string }) {
  const [isPending, startTransition] = useTransition();

  const [appData, setAppData] = useState<Appointment | null>(null);
  type FormDataKey = keyof typeof formData;
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [formData, setFormData] = useState({
    title: "Kevin Punter",
    diagnose: "Enter patient diagnose...",
    date: selectedDate ? selectedDate.toISOString() : undefined,
    notes: "Additional quick note...",
  });

  const handleChange = (field: FormDataKey, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    startTransition(async () => {
      const result = await getSelectedAppointment(appId);

      if ("error" in result) {
        setAppData(null);
        return;
      }

      setAppData(result);
    });
  }, [appId]);

  console.log(appData);
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
                  value={formData[key as FormDataKey]}
                  onChange={(e) =>
                    handleChange(key as FormDataKey, e.target.value)
                  }
                />
              ) : (
                <Input
                  id={key}
                  className="w-[50%] h-[35px]"
                  value={formData[key as FormDataKey]}
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
          <Label>Date:</Label>
          {isEditing ? (
            <DatePicker date={selectedDate} setDate={setSelectedDate} />
          ) : (
            <p>20 Sept 11h</p>
          )}
        </div>

        <div className="flex justify-between mt-1">
          <Link href={"/dashboard"}>Go Back</Link>

          <div className="flex items-center gap-3">
            <Button
              className="cursor-pointer"
              variant="secondary"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit"}
            </Button>
            <Button className="cursor-pointer" variant="destructive">
              Cancel Appointment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
