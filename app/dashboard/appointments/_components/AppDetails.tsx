"use client";

import React from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

export default function AppDetails() {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div>
      <div className="grid gap-2">
        <div className="grid gap-2 border-b-2 pb-1">
          <Label htmlFor="name-1">Title</Label>
          {isEditing ? (
            <Input className="w-[50%] h-[35px]" placeholder="Kevin Punter" />
          ) : (
            <p className="h-[35px]">Kevin Punter</p>
          )}
        </div>
        <div className="flex justify-between mt-1">
          <Button className="cursor-pointer" variant="secondary">
            Go Back
          </Button>
          <div className="flex items-center gap-3">
            <Button
              className="cursor-pointer"
              variant="secondary"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit"}
            </Button>
            <Button className="cursor-pointer" variant="destructive">
              Cancel Appointmenr
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
