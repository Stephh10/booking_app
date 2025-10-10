"use client";

import React from "react";
import { useState, useRef } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function UploadFile() {
  //show upload file
  const [showUpload, setShowUpload] = useState(false);
  const uploadRef = useRef<HTMLInputElement | null>(null);
  return (
    <div>
      {showUpload ? (
        <button
          className="showContentBtn"
          onClick={() => {
            setShowUpload(false);
          }}
        >
          <ChevronUp size={21} />
          Hide Upload Option
        </button>
      ) : (
        <button
          className="showContentBtn"
          onClick={() => {
            setShowUpload(true);
          }}
        >
          <ChevronDown size={21} /> Upload file
        </button>
      )}
      {showUpload ? (
        <div className="flex items-end gap-4 mt-2 ">
          <div className="preview">
            <h2>Preview...</h2>
          </div>
          <input className="uploadInput" type="text" />
          <input type="file" ref={uploadRef} className="hidden" />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => uploadRef.current?.click()}
              className="outlineMaxBtn"
            >
              Select file
            </button>
            <button className="primaryBtn h-[40px]">Upload file</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
