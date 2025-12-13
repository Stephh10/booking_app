"use client";

import React, { useRef, useState } from "react";
import Avatar from "@/components/Avatar";

export default function GeneralAvatar() {
  const [preview, setPreview] = useState<string | null>(null);
  const uploadRef = useRef<HTMLInputElement | null>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const previewUrl = URL.createObjectURL(selectedFile);
    setPreview(previewUrl);
  }
  return (
    <div className="flex gap-2 items-center my-3">
      <Avatar src={preview ? preview : "/default-profile.png"} />
      <div>
        <input
          ref={uploadRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageChange}
        />

        {preview ? (
          <div className="flex gap-2">
            <button
              onClick={() => {
                setPreview(null);
              }}
              className="middleBtn bg-[var(--card)] border-1 border-neutral-600 text-neutral-600"
            >
              Cancel
            </button>
            <button className="middleBtn">Save</button>
          </div>
        ) : (
          <button
            onClick={() => {
              uploadRef.current?.click();
            }}
            className="middleBtn"
          >
            Change
          </button>
        )}
      </div>
    </div>
  );
}
