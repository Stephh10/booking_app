"use client";

import React, { useRef, useState } from "react";
import Avatar from "@/components/Avatar";
import { useTransition } from "react";
import { uploadImage } from "@/app/actions/upload";
import { Spinner } from "@/components/ui/spinner";
import clsx from "clsx";
import { ProfileImage } from "@prisma/client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function GeneralAvatar({
  profileImage,
}: {
  profileImage: ProfileImage | null;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const uploadRef = useRef<HTMLInputElement | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleImageUpload() {
    startTransition(async () => {
      const response = file && (await uploadImage(file));

      if (response && response.success === false) {
        toast.error(response.message);
      }

      setPreview(null);
      setFile(null);
      return router.refresh();
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
      <Avatar
        src={preview ? preview : profileImage?.url || "/default-profile.png"}
      />
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
