"use client";

import React, { useRef, useState } from "react";
import Avatar from "@/components/Avatar";
import { useTransition } from "react";
import { uploadImage } from "@/app/actions/upload";
import { Spinner } from "@/components/ui/spinner";
import clsx from "clsx";

export default function GeneralAvatar() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const uploadRef = useRef<HTMLInputElement | null>(null);
  const [isPending, startTransition] = useTransition();

  const isPendingUpload = true;

  function handleImageUpload() {
    startTransition(async () => {
      const response = file && (await uploadImage(file));

      if (response && "error" in response) {
        console.log(response.error);
      }

      setPreview(null);
      setFile(null);
    });
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const previewUrl = URL.createObjectURL(selectedFile);
    setFile(selectedFile);
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
              disabled={isPending}
              onClick={() => {
                setPreview(null);
              }}
              className={clsx(
                "middleBtn bg-[var(--card)] border-1 border-neutral-600 text-neutral-600",
                isPending && "pointer-events-none"
              )}
            >
              Cancel
            </button>
            <button
              onClick={handleImageUpload}
              className={clsx("middleBtn", isPending && "pointer-events-none")}
            >
              {isPending ? <Spinner className="size-6 mx-auto" /> : "Confirm"}
            </button>
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
